const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const authMiddleware = require('../middleware/authMiddleware'); // Assuming you have an auth middleware to check JWT

const router = express.Router();

// Register a new user
router.post('/register', async (req, res) => {
    const { username, email, password } = req.body;

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({
            username,
            email,
            password: hashedPassword,
        });

        await user.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Login a user
// Login a user
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
      const user = await User.findOne({ email }).populate('favorites'); // Populate favorites
      if (!user) {
          return res.status(400).json({ message: 'Invalid credentials' });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
          return res.status(400).json({ message: 'Invalid credentials' });
      }

      const token = jwt.sign({ id: user._id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '1h' });
      res.json({ token, username: user.username, favorites: user.favorites }); // Return favorites with login
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
});


// Update user's favorites
router.patch('/update-favorites', authMiddleware, async (req, res) => {
    const { favorites } = req.body;
    const userId = req.user.id; // Get user ID from token

    try {
        await User.findByIdAndUpdate(userId, { favorites }, { new: true });
        res.status(200).json({ message: 'Favorites updated successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Fetch user data including favorites
router.get('/user', authMiddleware, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).populate('favorites');
        res.json({ username: user.username, favorites: user.favorites });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
