# NYUAD Major Tracker - Full Stack Setup Guide

This guide will help you set up the complete NYUAD Major Tracker application with both frontend and backend components.

## Prerequisites

- **Node.js** (v16 or higher)
- **npm** or **yarn**
- **MongoDB** (local installation or MongoDB Atlas account)
- **Git**

## Project Structure

```
NYUAD-Major-Tracker/
├── src/                    # Frontend React app
├── backend/                # Backend Node.js/Express app
├── package.json           # Frontend dependencies
├── backend/package.json   # Backend dependencies
└── README.md
```

## Quick Start

### 1. Clone and Setup

```bash
# Clone the repository
git clone <repository-url>
cd NYUAD-Major-Tracker

# Install frontend dependencies
npm install

# Install backend dependencies
cd backend
npm install
cd ..
```

### 2. Backend Setup

#### A. Environment Configuration

```bash
cd backend
cp env.example .env
```

Edit the `.env` file with your configuration:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# MongoDB Configuration
MONGODB_URI=mongodb://localhost:27017/nyuad-major-tracker

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRES_IN=7d

# CORS Configuration
FRONTEND_URL=http://localhost:5173

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

#### B. MongoDB Setup

**Option 1: Local MongoDB**
```bash
# Install MongoDB locally (instructions vary by OS)
# Start MongoDB service
mongod
```

**Option 2: MongoDB Atlas (Cloud)**
1. Create account at [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a new cluster
3. Get your connection string
4. Replace `MONGODB_URI` in `.env` with your Atlas connection string

#### C. Start Backend Server

```bash
cd backend

# Development mode (with auto-restart)
npm run dev

# OR Production mode
npm start
```

The backend will start on `http://localhost:5000`

#### D. Seed Database (Optional)

```bash
cd backend
npm run seed
```

This creates test users:
- **student1@nyu.edu** / **Password123**
- **student2@nyu.edu** / **Password123**
- **student3@nyu.edu** / **Password123**

### 3. Frontend Setup

#### A. Start Frontend Development Server

```bash
# From the root directory
npm run dev
```

The frontend will start on `http://localhost:5173`

#### B. Access the Application

Open your browser and navigate to `http://localhost:5173`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (protected)

### User Progress
- `GET /api/progress` - Get user progress (protected)
- `PUT /api/progress` - Update user progress (protected)
- `PATCH /api/progress/course` - Update course completion (protected)
- `DELETE /api/progress` - Reset user progress (protected)

### Health Check
- `GET /api/health` - API health status

## Development Workflow

### Backend Development

```bash
cd backend

# Start development server with auto-restart
npm run dev

# Run database seed
npm run seed

# Check API health
curl http://localhost:5000/api/health
```

### Frontend Development

```bash
# From root directory
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Testing the Application

1. **Start both servers** (backend on port 5000, frontend on port 5173)
2. **Open** `http://localhost:5173` in your browser
3. **Register** a new account or **login** with test credentials
4. **Select** majors and minors
5. **Navigate** to courses page to track progress

## Troubleshooting

### Common Issues

#### Backend Issues

**MongoDB Connection Error**
```bash
# Check if MongoDB is running
mongosh

# If using Atlas, verify connection string
# Make sure IP is whitelisted in Atlas
```

**Port Already in Use**
```bash
# Kill process on port 5000
lsof -ti:5000 | xargs kill -9
```

**JWT Secret Error**
```bash
# Generate a new JWT secret
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

#### Frontend Issues

**CORS Errors**
- Ensure backend is running on port 5000
- Check `FRONTEND_URL` in backend `.env`
- Verify CORS configuration in `backend/server.js`

**API Connection Errors**
- Check if backend server is running
- Verify API_BASE_URL in `src/utils/api.ts`
- Check browser console for detailed errors

### Debug Mode

**Backend Debug**
```bash
cd backend
DEBUG=* npm run dev
```

**Frontend Debug**
```bash
# Open browser dev tools
# Check Network tab for API calls
# Check Console for errors
```

## Production Deployment

### Backend Deployment

1. **Environment Variables**
   ```env
   NODE_ENV=production
   MONGODB_URI=your-production-mongodb-uri
   JWT_SECRET=your-production-jwt-secret
   FRONTEND_URL=https://your-frontend-domain.com
   ```

2. **Build and Deploy**
   ```bash
   cd backend
   npm install --production
   npm start
   ```

### Frontend Deployment

1. **Build for Production**
   ```bash
   npm run build
   ```

2. **Deploy** the `dist` folder to your hosting service

## Security Considerations

- **Change JWT_SECRET** in production
- **Use HTTPS** in production
- **Set up proper CORS** for your domain
- **Implement rate limiting** (already configured)
- **Use environment variables** for sensitive data
- **Regular security updates** for dependencies

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## Support

For issues and questions:
1. Check the troubleshooting section
2. Review the API documentation
3. Check browser console and server logs
4. Create an issue with detailed error information

## License

MIT License - see LICENSE file for details 