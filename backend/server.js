const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');

// Load env vars
dotenv.config();

const app = express();

const seedAdmin = require('./seeder');

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('MongoDB Connected');
        seedAdmin();
    })
    .catch(err => {
        console.error('MongoDB connection error:', err);
        // Don't exit process in dev if mongo isn't running, just log error
    });

// Middleware
app.use(express.json());
app.use(cors());

// Serve static files (uploads)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
const auth = require('./routes/auth');
const candidates = require('./routes/candidates');

app.use('/api/auth', auth);
app.use('/api/candidates', candidates);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
