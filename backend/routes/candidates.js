const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const Candidate = require('../models/Candidate');

// Set up Multer for file uploads
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

// @desc    Get all candidates
// @route   GET /api/candidates
// @access  Public
router.get('/', async (req, res) => {
    try {
        const candidates = await Candidate.find().sort({ createdAt: -1 });
        res.status(200).json({ success: true, count: candidates.length, data: candidates });
    } catch (err) {
        res.status(500).json({ success: false, error: 'Server Error' });
    }
});

// @desc    Create a new candidate
// @route   POST /api/candidates
// @access  Public
router.post('/', upload.single('resume'), async (req, res) => {
    try {
        const { name, email, phone, jobTitle } = req.body;
        let resumeUrl = '';

        if (req.file) {
            // In a real app, you'd upload to S3 here. For now, we serve locally.
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

// @desc    Update candidate status
// @route   PUT /api/candidates/:id/status
// @access  Public
router.put('/:id/status', async (req, res) => {
    try {
        const { status } = req.body;

        // Validate status
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

module.exports = router;
