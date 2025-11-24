// backend/models/User.js
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
    },
    // 👇 NEW FIELDS FOR PASSWORD RESET 👇
    resetPasswordToken: String,
    resetPasswordExpire: Date,
    // 👆 END NEW FIELDS 👆
}, {
    timestamps: true 
});

// Middleware to hash password before saving
userSchema.pre('save', async function (next) {
    // Only hash if the password field is modified (or created)
    if (!this.isModified('password') && !this.isModified('resetPasswordToken')) { 
        return next();
    }
    
    // Hash password if it was modified
    if (this.isModified('password')) {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
    }
    next();
});

// Method to compare entered password with hashed password
userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', userSchema);
export default User;