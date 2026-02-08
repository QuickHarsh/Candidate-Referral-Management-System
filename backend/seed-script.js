const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');
const bcrypt = require('bcryptjs');

dotenv.config();

const seedAdmin = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB Connected');

        const adminEmail = 'admin@worko.com';
        const adminPassword = 'Workoadmin123';

        let user = await User.findOne({ email: adminEmail });

        if (user) {
            console.log('Admin account exists. Updating password...');
            user.password = adminPassword;
            await user.save();
            console.log('Admin password updated to: Workoadmin123');
        } else {
            await User.create({
                name: 'Super Admin',
                email: adminEmail,
                password: adminPassword,
                role: 'admin'
            });
            console.log('Admin account created successfully.');
        }

        process.exit();
    } catch (error) {
        console.error('Error seeding admin:', error);
        process.exit(1);
    }
};

seedAdmin();
