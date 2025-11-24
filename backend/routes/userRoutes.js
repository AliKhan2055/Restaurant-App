// backend/routes/userRoutes.js
import express from 'express';
import User from '../models/user.js';
import jwt from 'jsonwebtoken';

const router = express.Router();

// ---------- register ----------
router.post('/register', async (req, res) => {
  const { firstName, email, password } = req.body;
  if (!firstName || !email || !password) return res.status(400).json({ message: 'Missing fields' });
  try {
    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ message: 'Email exists' });
    const user = await User.create({ firstName, email, password });
    res.status(201).json({ firstName: user.firstName, email: user.email });
  } catch (e) {
    res.status(500).json({ message: 'Server error' });
  }
});

// ---------- login ----------
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.json({ token, firstName: user.firstName, email: user.email });
  } catch (e) {
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;