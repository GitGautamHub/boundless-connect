import express from 'express';
import bcrypt from 'bcrypt';
import User from '../models/User.js';
import Seller from '../models/Seller.js'; // Ensure Seller model is imported

const router = express.Router();

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Email and password are required' });
    }

    // Find user by email
    const user = await User.findOne({ email }).populate('sellerId');
    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    if (!user.sellerId) {
      return res.status(404).json({ success: false, message: 'Seller not linked to the user' });
    }

    // Compare password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    // Send user and seller info
    res.status(200).json({
      success: true,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        sellerId: user.sellerId._id,
      },
      seller: {
        id: user.sellerId._id,
        name: user.sellerId.name,
        storeName: user.sellerId.storeName,
        category: user.sellerId.category,
      },
    });
  } catch (error) {
    console.error('Error during login:', error.message);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

export default router;
