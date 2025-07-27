import express from 'express';
import { 
  getUserProgress, 
  updateUserProgress, 
  updateCourseCompletion, 
  resetUserProgress 
} from '../controllers/progressController.js';
import { validateProgressUpdate } from '../middleware/validation.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// All routes require authentication
router.use(protect);

// @route   GET /api/progress
// @desc    Get user progress
// @access  Private
router.get('/', getUserProgress);

// @route   PUT /api/progress
// @desc    Update user progress
// @access  Private
router.put('/', validateProgressUpdate, updateUserProgress);

// @route   PATCH /api/progress/course
// @desc    Update specific course completion
// @access  Private
router.patch('/course', updateCourseCompletion);

// @route   DELETE /api/progress
// @desc    Reset user progress
// @access  Private
router.delete('/', resetUserProgress);

export default router; 