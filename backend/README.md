# NYUAD Major Tracker Backend

A Node.js + Express + MongoDB backend for the NYUAD Major Tracker application.

## Features

- 🔐 JWT-based authentication
- 👤 User registration and login
- 📊 User progress tracking
- 🛡️ Secure password hashing with bcrypt
- 📝 Input validation with express-validator
- 🚀 Rate limiting and security headers
- 🗄️ MongoDB with Mongoose ODM

## Prerequisites

- Node.js (v16 or higher)
- MongoDB (local or cloud instance)
- npm or yarn

## Installation

1. **Clone the repository and navigate to backend directory:**
   ```bash
   cd backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   ```bash
   cp env.example .env
   ```
   
   Edit `.env` file with your configuration:
   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/nyuad-major-tracker
   JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
   JWT_EXPIRES_IN=7d
   FRONTEND_URL=http://localhost:5173
   ```

4. **Start MongoDB:**
   - Local: Make sure MongoDB is running on your machine
   - Cloud: Use MongoDB Atlas or similar service

5. **Seed the database (optional):**
   ```bash
   npm run seed
   ```

6. **Start the development server:**
   ```bash
   npm run dev
   ```

The server will start on `http://localhost:5000`

## API Endpoints

### Authentication

#### POST `/api/auth/register`
Register a new user.

**Request Body:**
```json
{
  "email": "student@nyu.edu",
  "password": "Password123",
  "firstName": "John",
  "lastName": "Doe"
}
```

**Response:**
```json
{
  "message": "User registered successfully",
  "user": {
    "id": "user_id",
    "email": "student@nyu.edu",
    "firstName": "John",
    "lastName": "Doe"
  },
  "token": "jwt_token"
}
```

#### POST `/api/auth/login`
Login user.

**Request Body:**
```json
{
  "email": "student@nyu.edu",
  "password": "Password123"
}
```

**Response:**
```json
{
  "message": "Login successful",
  "user": {
    "id": "user_id",
    "email": "student@nyu.edu",
    "firstName": "John",
    "lastName": "Doe"
  },
  "token": "jwt_token"
}
```

#### GET `/api/auth/me`
Get current user profile (requires authentication).

**Headers:**
```
Authorization: Bearer <jwt_token>
```

### User Progress

#### GET `/api/progress`
Get user progress (requires authentication).

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Response:**
```json
{
  "message": "User progress retrieved successfully",
  "progress": {
    "userId": "user_id",
    "email": "student@nyu.edu",
    "majors": ["Computer Science"],
    "minors": ["Interactive Media"],
    "mandatory": {},
    "majorReqs": {},
    "minorReqs": {},
    "majorElectives": {},
    "minorElectives": {},
    "generalElectives": 0,
    "totalCreditsEarned": 0,
    "degreeCompletionPercentage": 0,
    "lastUpdated": "2024-01-01T00:00:00.000Z"
  }
}
```

#### PUT `/api/progress`
Update user progress (requires authentication).

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Request Body:**
```json
{
  "majors": ["Computer Science"],
  "minors": ["Interactive Media"],
  "mandatory": {
    "Core Curriculum": true,
    "Writing": true
  },
  "majorReqs": {
    "Introduction to Computer Science": true,
    "Data Structures": false
  },
  "generalElectives": 8,
  "totalCreditsEarned": 32,
  "degreeCompletionPercentage": 25
}
```

#### PATCH `/api/progress/course`
Update specific course completion (requires authentication).

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Request Body:**
```json
{
  "courseName": "Introduction to Computer Science",
  "category": "majorReqs",
  "completed": true
}
```

#### DELETE `/api/progress`
Reset user progress (requires authentication).

**Headers:**
```
Authorization: Bearer <jwt_token>
```

### Health Check

#### GET `/api/health`
Check API health status.

**Response:**
```json
{
  "status": "OK",
  "message": "NYUAD Major Tracker API is running",
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

## Test Credentials

After running the seed script, you can use these test accounts:

- **Email:** student1@nyu.edu | **Password:** Password123
- **Email:** student2@nyu.edu | **Password:** Password123  
- **Email:** student3@nyu.edu | **Password:** Password123

## Project Structure

```
backend/
├── config/
│   └── database.js          # MongoDB connection
├── controllers/
│   ├── authController.js    # Authentication logic
│   └── progressController.js # Progress management
├── middleware/
│   ├── auth.js             # JWT authentication
│   └── validation.js       # Input validation
├── models/
│   ├── User.js             # User model
│   └── UserProgress.js     # Progress model
├── routes/
│   ├── auth.js             # Auth routes
│   ├── progress.js         # Progress routes
│   └── user.js             # User routes
├── scripts/
│   └── seed.js             # Database seeding
├── server.js               # Main server file
├── package.json
└── README.md
```

## Security Features

- 🔐 JWT token authentication
- 🔒 Password hashing with bcrypt
- 🛡️ Helmet.js security headers
- ⚡ Rate limiting
- ✅ Input validation and sanitization
- 🌐 CORS configuration

## Development

### Running in Development Mode
```bash
npm run dev
```

### Running in Production Mode
```bash
npm start
```

### Seeding Database
```bash
npm run seed
```

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Server port | 5000 |
| `MONGODB_URI` | MongoDB connection string | - |
| `JWT_SECRET` | JWT signing secret | - |
| `JWT_EXPIRES_IN` | JWT expiration time | 7d |
| `FRONTEND_URL` | Frontend URL for CORS | http://localhost:5173 |
| `NODE_ENV` | Environment mode | development |

## Error Handling

The API returns consistent error responses:

```json
{
  "message": "Error description",
  "errors": [
    {
      "field": "email",
      "message": "Please provide a valid email address"
    }
  ]
}
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

MIT License 