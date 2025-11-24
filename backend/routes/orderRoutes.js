// backend/routes/orderRoutes.js
import express from 'express';
import Order from '../models/order.js';
import User from '../models/user.js';
import jwt from 'jsonwebtoken';

const router = express.Router();

const authMiddleware = async (req, res, next) => {
  const hdr = req.headers.authorization;
  if (!hdr) return res.status(401).json({ message: 'No token' });
  try {
    const token = hdr.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select('-password');
    next();
  } catch (e) {
    res.status(401).json({ message: 'Token invalid' });
  }
};

router.post('/', authMiddleware, async (req, res) => {
  try {
    const { items, total, address, paymentMethod } = req.body;
    const order = await Order.create({
      userId: req.user._id,
      items,
      total,
      address,
      paymentMethod
    });
    res.status(201).json(order);
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/myorders', authMiddleware, async (req, res) => {
  const orders = await Order.find({ userId: req.user._id }).sort({ createdAt: -1 });
  res.json(orders);
});

router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: 'Order not found' });
    if (order.userId.toString() !== req.user._id.toString())
      return res.status(403).json({ message: 'Not authorized' });
    await Order.findByIdAndDelete(req.params.id);
    res.json({ message: 'Order deleted' });
  } catch (e) {
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;