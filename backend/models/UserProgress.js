import mongoose from 'mongoose';

const userProgressSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true
  },
  majors: [{
    type: String,
    trim: true
  }],
  minors: [{
    type: String,
    trim: true
  }],
  // Course completion tracking
  mandatory: {
    type: Map,
    of: Boolean,
    default: new Map()
  },
  majorReqs: {
    type: Map,
    of: Boolean,
    default: new Map()
  },
  minorReqs: {
    type: Map,
    of: Boolean,
    default: new Map()
  },
  majorElectives: {
    type: Map,
    of: Boolean,
    default: new Map()
  },
  minorElectives: {
    type: Map,
    of: Boolean,
    default: new Map()
  },
  major2Reqs: {
    type: Map,
    of: Boolean,
    default: new Map()
  },
  minor2Reqs: {
    type: Map,
    of: Boolean,
    default: new Map()
  },
  major2Electives: {
    type: Map,
    of: Boolean,
    default: new Map()
  },
  minor2Electives: {
    type: Map,
    of: Boolean,
    default: new Map()
  },
  capstone: {
    type: Map,
    of: Boolean,
    default: new Map()
  },
  generalElectives: {
    type: Number,
    default: 0
  },
  // Progress statistics
  totalCreditsEarned: {
    type: Number,
    default: 0
  },
  degreeCompletionPercentage: {
    type: Number,
    default: 0
  },
  // Metadata
  lastUpdated: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Index for efficient queries
userProgressSchema.index({ userId: 1 });
userProgressSchema.index({ email: 1 });

// Method to calculate total credits earned
userProgressSchema.methods.calculateTotalCredits = function() {
  // This would need to be implemented based on your course data structure
  // For now, we'll return the stored value
  return this.totalCreditsEarned;
};

// Method to calculate degree completion percentage
userProgressSchema.methods.calculateDegreeCompletion = function() {
  // This would need to be implemented based on your degree requirements
  // For now, we'll return the stored value
  return this.degreeCompletionPercentage;
};

// Method to update progress
userProgressSchema.methods.updateProgress = function(updates) {
  Object.assign(this, updates);
  this.lastUpdated = new Date();
  return this.save();
};

const UserProgress = mongoose.model('UserProgress', userProgressSchema);

export default UserProgress; 