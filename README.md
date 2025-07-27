# NYUAD Major Tracker

A comprehensive web application for NYU Abu Dhabi students to track their academic progress, manage major/minor selections, and monitor degree completion.

## 🚀 Features

### Frontend (React + TypeScript)
- **Modern UI/UX** with Tailwind CSS and responsive design
- **Real-time progress tracking** with visual indicators
- **Interactive course selection** with search functionality
- **Progress visualization** with charts and statistics
- **Secure authentication** with JWT tokens

### Backend (Node.js + Express + MongoDB)
- **RESTful API** with comprehensive endpoints
- **JWT-based authentication** with secure password hashing
- **MongoDB database** for persistent data storage
- **Input validation** and error handling
- **Rate limiting** and security headers
- **CORS configuration** for cross-origin requests

### Core Functionality
- **User Registration & Login** with secure authentication
- **Major/Minor Selection** with validation rules
- **Course Progress Tracking** with completion status
- **Degree Completion Calculator** with percentage tracking
- **Data Persistence** across sessions and devices
- **Real-time Updates** with immediate feedback

## 🛠️ Tech Stack

### Frontend
- **React 19** with TypeScript
- **Vite** for fast development and building
- **Tailwind CSS** for styling
- **React Router** for navigation
- **React Context** for state management

### Backend
- **Node.js** with Express.js
- **MongoDB** with Mongoose ODM
- **JWT** for authentication
- **bcryptjs** for password hashing
- **express-validator** for input validation
- **Helmet** for security headers
- **CORS** for cross-origin requests

## 📦 Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Quick Start

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd NYUAD-Major-Tracker
   ```

2. **Install dependencies**
   ```bash
   # Frontend dependencies
   npm install
   
   # Backend dependencies
   cd backend
   npm install
   cd ..
   ```

3. **Configure environment**
   ```bash
   cd backend
   cp env.example .env
   # Edit .env with your MongoDB URI and JWT secret
   ```

4. **Start the application**
   ```bash
   # Terminal 1: Start backend
   cd backend
   npm run dev
   
   # Terminal 2: Start frontend
   npm run dev
   ```

5. **Access the application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:5000

### Database Setup

**Option 1: Local MongoDB**
```bash
# Install and start MongoDB locally
mongod
```

**Option 2: MongoDB Atlas**
1. Create account at [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create cluster and get connection string
3. Update `MONGODB_URI` in backend `.env`

### Seed Database (Optional)
```bash
cd backend
npm run seed
```

Creates test users:
- student1@nyu.edu / Password123
- student2@nyu.edu / Password123
- student3@nyu.edu / Password123

## 📚 API Documentation

### Authentication Endpoints
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user

### Progress Endpoints
- `GET /api/progress` - Get user progress
- `PUT /api/progress` - Update user progress
- `PATCH /api/progress/course` - Update course completion
- `DELETE /api/progress` - Reset user progress

### Health Check
- `GET /api/health` - API status

## 🏗️ Project Structure

```
NYUAD-Major-Tracker/
├── src/                          # Frontend source code
│   ├── components/               # React components
│   ├── contexts/                 # React contexts
│   ├── pages/                    # Page components
│   ├── utils/                    # Utility functions
│   └── assets/                   # Static assets
├── backend/                      # Backend source code
│   ├── config/                   # Configuration files
│   ├── controllers/              # Route controllers
│   ├── middleware/               # Express middleware
│   ├── models/                   # MongoDB models
│   ├── routes/                   # API routes
│   └── scripts/                  # Utility scripts
├── public/                       # Public assets
└── package.json                  # Frontend dependencies
```

## 🔐 Security Features

- **JWT Authentication** with secure token management
- **Password Hashing** using bcryptjs
- **Input Validation** with express-validator
- **Rate Limiting** to prevent abuse
- **Security Headers** with Helmet.js
- **CORS Protection** for cross-origin requests
- **Environment Variables** for sensitive data

## 🎯 Key Features

### User Management
- Secure registration and login
- JWT-based session management
- User profile management

### Academic Tracking
- Major and minor selection
- Course completion tracking
- Progress visualization
- Degree completion percentage

### Data Persistence
- MongoDB database storage
- Real-time synchronization
- Cross-device data access

## 🚀 Deployment

### Backend Deployment
1. Set production environment variables
2. Install production dependencies
3. Start the server with `npm start`

### Frontend Deployment
1. Build the application: `npm run build`
2. Deploy the `dist` folder to your hosting service

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support and questions:
1. Check the [SETUP.md](SETUP.md) guide
2. Review the API documentation
3. Check browser console and server logs
4. Create an issue with detailed information

## 🙏 Acknowledgments

- NYU Abu Dhabi for academic requirements
- React and Node.js communities
- MongoDB for database technology
- All contributors and testers

---

**Built with ❤️ for NYU Abu Dhabi students**
