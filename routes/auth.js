const express = require('express');
const router = express.Router();
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const { protect } = require('../middleware/auth.js');

// Utility: Generate JWT
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '12h' });
};

// POST: User Registration
router.post('/register', async (req, res) => {
    try {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({ message: "Please fill all fields" });
        }

        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: "User already exists" });
        }

        const newUser = await User.create({ username, email, password });

        if (newUser) {
            res.status(201).json({
                _id: newUser._id,
                username: newUser.username,
                email: newUser.email,
                token: generateToken(newUser._id)
            });
        } else {
            res.status(400).json({ message: "Invalid user data" });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server Error" });
    }
});

// POST: User Login
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Please fill all fields" });
        }

        const userFound = await User.findOne({ email }).select("+password");

        if (userFound && (await userFound.matchPassword(password))) {
            res.status(200).json({
                _id: userFound._id,
                username: userFound.username,
                email: userFound.email,
                token: generateToken(userFound._id)
            });
        } else {
            res.status(401).json({ message: "Invalid email or password" });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server Error" });
    }
});

// GET: Current User
router.get('/me', protect, async (req, res) => {
    res.status(200).json(req.user);
});

// user profile data
router.get('/profile/:_id', async (req, res) => {
    try {
        const user = await User.findById(req.params._id);
        if (user) {
            res.status(200).json({
                _id: user._id,
                username: user.username,
                email: user.email
            })
        } else {
            res.status(404).json({ message: "User not found" });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server Error" });
    }
});

module.exports = router;