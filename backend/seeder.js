const mongoose = require('mongoose');
const User = require('./models/User');
const dotenv = require('dotenv');

dotenv.config();

const seedAdmin = async () => {
    try {
        const adminEmail = 'admin@worko.com';
        const adminPassword = 'Workoadmin123';

        const userExists = await User.findOne({ email: adminEmail });

        if (userExists) {
            console.log('Admin account already exists.');
            return;
        }

        await User.create({
            name: 'Super Admin',
            email: adminEmail,
            password: adminPassword,
            role: 'admin'
        });

        console.log('Admin account created successfully.');
    } catch (error) {
        console.error('Error seeding admin:', error);
    }
};

module.exports = seedAdmin;
