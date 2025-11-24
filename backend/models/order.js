// backend/models/order.js
import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  userId:        { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  items:         [{ name: String, quantity: Number, price: Number }],
  total:         { type: Number, required: true },
  address:       { type: String, required: true },
  paymentMethod: { type: String, required: true },
  status:        { type: String, default: 'Confirmed' },
  createdAt:     { type: Date, default: Date.now }
}, { timestamps: true });

export default mongoose.model('Order', orderSchema);