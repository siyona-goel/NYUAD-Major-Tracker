import { body, validationResult } from 'express-validator';

// Validation result handler
export const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      message: 'Validation failed',
      errors: errors.array().map(error => ({
        field: error.path,
        message: error.msg
      }))
    });
  }
  next();
};

// Registration validation
export const validateRegistration = [
  body('email')
    .isEmail()
    .withMessage('Please provide a valid email address')
    .normalizeEmail(),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
    .withMessage('Password must contain at least one uppercase letter, one lowercase letter, and one number'),
  body('firstName')
    .optional()
    .trim()
    .isLength({ min: 1, max: 50 })
    .withMessage('First name must be between 1 and 50 characters'),
  body('lastName')
    .optional()
    .trim()
    .isLength({ min: 1, max: 50 })
    .withMessage('Last name must be between 1 and 50 characters'),
  handleValidationErrors
];

// Login validation
export const validateLogin = [
  body('email')
    .isEmail()
    .withMessage('Please provide a valid email address')
    .normalizeEmail(),
  body('password')
    .notEmpty()
    .withMessage('Password is required'),
  handleValidationErrors
];

// Progress update validation
export const validateProgressUpdate = [
  body('majors')
    .optional()
    .isArray()
    .withMessage('Majors must be an array'),
  body('minors')
    .optional()
    .isArray()
    .withMessage('Minors must be an array'),
  body('mandatory')
    .optional()
    .isObject()
    .withMessage('Mandatory must be an object'),
  body('majorReqs')
    .optional()
    .isObject()
    .withMessage('Major requirements must be an object'),
  body('minorReqs')
    .optional()
    .isObject()
    .withMessage('Minor requirements must be an object'),
  body('majorElectives')
    .optional()
    .isObject()
    .withMessage('Major electives must be an object'),
  body('minorElectives')
    .optional()
    .isObject()
    .withMessage('Minor electives must be an object'),
  body('generalElectives')
    .optional()
    .isNumeric()
    .withMessage('General electives must be a number'),
  handleValidationErrors
]; 