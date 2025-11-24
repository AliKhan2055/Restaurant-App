// server.js  (FULL – fixed env load order)
import dotenv from 'dotenv';
dotenv.config();                       // ➊ load env BEFORE anything else

import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

// --- Import Routes ---
import userRoutes from './routes/userRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import MenuItem from './models/menuItem.js';

// --- 1. MongoDB Connection ---
const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB Connected Successfully: ${conn.connection.host}`);
    } catch (error) {
        console.error(`ERROR: MongoDB connection failed: ${error.message}`);
        process.exit(1);
    }
};
connectDB();

// --- 2. Express App ---
const app = express();

// --- 3. Middleware ---
app.use(cors());
app.use(express.json());

// --- 4. Basic Routes ---
app.get('/', (req, res) => res.send('Monal API is running...'));

app.get('/api/menu', async (req, res) => {
    try {
        const items = await MenuItem.find({});
        res.json(items);
    } catch (error) {
        console.error("Error fetching menu items:", error);
        res.status(500).json({ message: 'Error fetching menu items' });
    }
});

// --- 5. API Routes ---
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);

// --- 6. Start Server ---
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));