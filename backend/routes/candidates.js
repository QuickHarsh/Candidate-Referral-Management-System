const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const Candidate = require('../models/Candidate');
const { protect, authorize } = require('../middleware/auth');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    },
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'application/pdf') {
        cb(null, true);
    } else {
        cb(new Error('Only PDF files are allowed!'), false);
    }
};

const upload = multer({
    storage: storage,
    fileFilter: fileFilter
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
        const candidates = await Candidate.find().sort({ createdAt: -1 });
        res.status(200).json({ success: true, count: candidates.length, data: candidates });
    } catch (err) {
        res.status(500).json({ success: false, error: 'Server Error' });
    }
});

router.post('/', upload.single('resume'), async (req, res) => {
    try {
        const { name, email, phone, jobTitle } = req.body;
        let resumeUrl = '';

        if (req.file) {
            resumeUrl = `/uploads/${req.file.filename}`;
        }

        const candidate = await Candidate.create({
            name,
            email,
            phone,
            jobTitle,
            resumeUrl,
        });

        res.status(201).json({ success: true, data: candidate });
    } catch (err) {
        if (err.name === 'ValidationError') {
            const messages = Object.values(err.errors).map((val) => val.message);
            return res.status(400).json({ success: false, error: messages });
        }
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
        );

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
