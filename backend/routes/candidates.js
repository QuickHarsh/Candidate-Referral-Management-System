const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const Candidate = require('../models/Candidate');
const { protect, authorize } = require('../middleware/auth');

// Use memory storage to store file in buffer
const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'application/pdf') {
        cb(null, true);
    } else {
        cb(new Error('Only PDF files are allowed!'), false);
    }
};

const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit
});

router.get('/stats', protect, authorize('admin'), async (req, res) => {
    try {
        const stats = await Candidate.aggregate([
            {
                $group: {
                    _id: '$status',
                    count: { $sum: 1 }
                }
            }
        ]);

        const total = await Candidate.countDocuments();

        const formattedStats = {
            total,
            pending: stats.find(s => s._id === 'Pending')?.count || 0,
            reviewed: stats.find(s => s._id === 'Reviewed')?.count || 0,
            hired: stats.find(s => s._id === 'Hired')?.count || 0,
        };

        res.status(200).json({ success: true, data: formattedStats });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, error: 'Server Error' });
    }
});

router.get('/', protect, authorize('admin', 'user'), async (req, res) => {
    try {
        // Exclude resume data from list view to keep it light
        const candidates = await Candidate.find().select('-resume.data').sort({ createdAt: -1 });
        res.status(200).json({ success: true, count: candidates.length, data: candidates });
    } catch (err) {
        res.status(500).json({ success: false, error: 'Server Error' });
    }
});

router.get('/:id/resume', async (req, res) => {
    try {
        const candidate = await Candidate.findById(req.params.id);

        if (!candidate || !candidate.resume || !candidate.resume.data) {
            return res.status(404).json({ success: false, error: 'Resume not found' });
        }

        res.set('Content-Type', candidate.resume.contentType);
        res.send(candidate.resume.data);
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, error: 'Server Error' });
    }
});

router.post('/', upload.single('resume'), async (req, res) => {
    try {
        const { name, email, phone, jobTitle } = req.body;

        const candidateData = {
            name,
            email,
            phone,
            jobTitle,
        };

        if (req.file) {
            candidateData.resume = {
                data: req.file.buffer,
                contentType: req.file.mimetype
            };
        }

        const candidate = await Candidate.create(candidateData);

        // Update resumeUrl to point to the new endpoint
        if (req.file) {
            candidate.resumeUrl = `/api/candidates/${candidate._id}/resume`;
            await candidate.save();
        }

        // Return candidate without heavy resume data
        const responseCandidate = candidate.toObject();
        delete responseCandidate.resume;

        res.status(201).json({ success: true, data: responseCandidate });
    } catch (err) {
        if (err.name === 'ValidationError') {
            const messages = Object.values(err.errors).map((val) => val.message);
            return res.status(400).json({ success: false, error: messages });
        }
        console.error(err);
        res.status(500).json({ success: false, error: 'Server Error' });
    }
});

router.put('/:id/status', protect, authorize('admin'), async (req, res) => {
    try {
        const { status } = req.body;

        const validStatuses = ['Pending', 'Reviewed', 'Hired'];
        if (!validStatuses.includes(status)) {
            return res.status(400).json({ success: false, error: 'Invalid status' });
        }

        const candidate = await Candidate.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true, runValidators: true }
        ).select('-resume.data');

        if (!candidate) {
            return res.status(404).json({ success: false, error: 'Candidate not found' });
        }

        res.status(200).json({ success: true, data: candidate });
    } catch (err) {
        res.status(500).json({ success: false, error: 'Server Error' });
    }
});

router.delete('/:id', protect, authorize('admin'), async (req, res) => {
    try {
        const candidate = await Candidate.findByIdAndDelete(req.params.id);

        if (!candidate) {
            return res.status(404).json({ success: false, error: 'Candidate not found' });
        }

        res.status(200).json({ success: true, data: {} });
    } catch (err) {
        res.status(500).json({ success: false, error: 'Server Error' });
    }
});

module.exports = router;
