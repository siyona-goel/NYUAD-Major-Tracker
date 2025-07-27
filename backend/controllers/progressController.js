import UserProgress from '../models/UserProgress.js';

// @desc    Get user progress
// @route   GET /api/progress
// @access  Private
export const getUserProgress = async (req, res) => {
  try {
    const userProgress = await UserProgress.findOne({ userId: req.user._id });
    
    if (!userProgress) {
      return res.status(404).json({ message: 'User progress not found' });
    }

    res.json({
      message: 'User progress retrieved successfully',
      progress: userProgress
    });
  } catch (error) {
    console.error('Get user progress error:', error);
    res.status(500).json({ message: 'Server error while retrieving progress' });
  }
};

// @desc    Update user progress
// @route   PUT /api/progress
// @access  Private
export const updateUserProgress = async (req, res) => {
  try {
    const {
      majors,
      minors,
      mandatory,
      majorReqs,
      minorReqs,
      majorElectives,
      minorElectives,
      major2Reqs,
      minor2Reqs,
      major2Electives,
      minor2Electives,
      capstone,
      generalElectives,
      totalCreditsEarned,
      degreeCompletionPercentage
    } = req.body;

    let userProgress = await UserProgress.findOne({ userId: req.user._id });

    if (!userProgress) {
      // Create new progress if it doesn't exist
      userProgress = new UserProgress({
        userId: req.user._id,
        email: req.user.email
      });
    }

    // Update fields if provided
    if (majors !== undefined) userProgress.majors = majors;
    if (minors !== undefined) userProgress.minors = minors;
    if (mandatory !== undefined) userProgress.mandatory = new Map(Object.entries(mandatory));
    if (majorReqs !== undefined) userProgress.majorReqs = new Map(Object.entries(majorReqs));
    if (minorReqs !== undefined) userProgress.minorReqs = new Map(Object.entries(minorReqs));
    if (majorElectives !== undefined) userProgress.majorElectives = new Map(Object.entries(majorElectives));
    if (minorElectives !== undefined) userProgress.minorElectives = new Map(Object.entries(minorElectives));
    if (major2Reqs !== undefined) userProgress.major2Reqs = new Map(Object.entries(major2Reqs));
    if (minor2Reqs !== undefined) userProgress.minor2Reqs = new Map(Object.entries(minor2Reqs));
    if (major2Electives !== undefined) userProgress.major2Electives = new Map(Object.entries(major2Electives));
    if (minor2Electives !== undefined) userProgress.minor2Electives = new Map(Object.entries(minor2Electives));
    if (capstone !== undefined) userProgress.capstone = new Map(Object.entries(capstone));
    if (generalElectives !== undefined) userProgress.generalElectives = generalElectives;
    if (totalCreditsEarned !== undefined) userProgress.totalCreditsEarned = totalCreditsEarned;
    if (degreeCompletionPercentage !== undefined) userProgress.degreeCompletionPercentage = degreeCompletionPercentage;

    userProgress.lastUpdated = new Date();
    await userProgress.save();

    res.json({
      message: 'User progress updated successfully',
      progress: userProgress
    });
  } catch (error) {
    console.error('Update user progress error:', error);
    res.status(500).json({ message: 'Server error while updating progress' });
  }
};

// @desc    Update specific course completion
// @route   PATCH /api/progress/course
// @access  Private
export const updateCourseCompletion = async (req, res) => {
  try {
    const { courseName, category, completed } = req.body;

    if (!courseName || !category || completed === undefined) {
      return res.status(400).json({ 
        message: 'Course name, category, and completed status are required' 
      });
    }

    let userProgress = await UserProgress.findOne({ userId: req.user._id });

    if (!userProgress) {
      return res.status(404).json({ message: 'User progress not found' });
    }

    // Update the specific category map
    if (userProgress[category] instanceof Map) {
      userProgress[category].set(courseName, completed);
    } else {
      return res.status(400).json({ message: 'Invalid category' });
    }

    userProgress.lastUpdated = new Date();
    await userProgress.save();

    res.json({
      message: 'Course completion updated successfully',
      progress: userProgress
    });
  } catch (error) {
    console.error('Update course completion error:', error);
    res.status(500).json({ message: 'Server error while updating course completion' });
  }
};

// @desc    Reset user progress
// @route   DELETE /api/progress
// @access  Private
export const resetUserProgress = async (req, res) => {
  try {
    const userProgress = await UserProgress.findOne({ userId: req.user._id });

    if (!userProgress) {
      return res.status(404).json({ message: 'User progress not found' });
    }

    // Reset all progress data
    userProgress.majors = [];
    userProgress.minors = [];
    userProgress.mandatory = new Map();
    userProgress.majorReqs = new Map();
    userProgress.minorReqs = new Map();
    userProgress.majorElectives = new Map();
    userProgress.minorElectives = new Map();
    userProgress.major2Reqs = new Map();
    userProgress.minor2Reqs = new Map();
    userProgress.major2Electives = new Map();
    userProgress.minor2Electives = new Map();
    userProgress.capstone = new Map();
    userProgress.generalElectives = 0;
    userProgress.totalCreditsEarned = 0;
    userProgress.degreeCompletionPercentage = 0;
    userProgress.lastUpdated = new Date();

    await userProgress.save();

    res.json({
      message: 'User progress reset successfully',
      progress: userProgress
    });
  } catch (error) {
    console.error('Reset user progress error:', error);
    res.status(500).json({ message: 'Server error while resetting progress' });
  }
}; 