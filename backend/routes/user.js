import express from 'express';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// All routes require authentication
router.use(protect);

// @route   GET /api/user/profile
// @desc    Get user profile
// @access  Private
router.get('/profile', (req, res) => {
  res.json({
    message: 'User profile retrieved successfully',
    user: req.user
  });
});

// @route   PUT /api/user/profile
// @desc    Update user profile
// @access  Private
router.put('/profile', (req, res) => {
  // TODO: Implement profile update functionality
  res.json({
    message: 'Profile update endpoint - to be implemented'
  });
});

export default router; 