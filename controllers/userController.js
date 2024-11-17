const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
require('dotenv').config();
// Register User
exports.register = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        // check if any fields are empty
        if (!name || !email || !password || !role) {
            console.log("all fields are required");
            return res.sendStatus(400).json({ error: "all fields are required" }); // return statement is necessary as it block the execution of further code
        }

        // check for user already exist
        const userExist = await User.findOne({ email });
        if (userExist) {
            console.log("Email already exist");
            return res.status(201).send("Email already exists");
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        // create new user
        try {
            const newUser = await User.create({
                name,
                email,
                password: hashedPassword,
                role
            });
            res.status(201).json({ message: 'User registered successfully', user: newUser });
        } catch (e) {
            console.log(e);
            res.status(500).json({ error: 'Registration failed', details: e.message });
        }
    } catch (error) {
        res.status(500).json({ error: 'process failed', details: error.message });
    }
};

// Login User
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        const ispasswordValid = await bcrypt.compare(password, user.password);
        if (!user || !ispasswordValid) {
            console.log("no user found or invalid password");
            return res.status(400).json({ failed: "no user found or invalid password" });
        }
        
        const token = jwt.sign({ id: user._id, role: user.role }, 
            process.env.JWT_SECRET, { expiresIn: '20d' }
        );
        res.json({ message: 'Login successful',user, token });
    } catch (error) {
        res.status(500).json({ error: 'Login failed', details: error.message });
    }
};

// Fetch All Admins
exports.getAdmins = async (req, res) => {
    try {
        const admins = await User.find({ role: 'admin' }, 'name email');
        res.json({admins: admins});
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch admins', details: error.message });
    }
};
