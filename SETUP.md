# Quick Start Guide

## Prerequisites
- Node.js v14+ installed
- MongoDB installed locally OR MongoDB Atlas account (cloud)
- Git installed

## 5-Minute Setup

### Step 1: MongoDB Connection

**Option A: Local MongoDB**
```bash
# Make sure MongoDB is running
mongod
```

**Option B: MongoDB Atlas (Cloud)**
1. Go to https://www.mongodb.com/cloud/atlas
2. Create a free cluster
3. Get connection string
4. Use it in server/.env as MONGODB_URI

---

### Step 2: Backend Setup

```bash
cd server

# Install dependencies
npm install

# Create .env file (already created, update if needed)
# Ensure these values are set:
# PORT=5000
# MONGODB_URI=mongodb://localhost:27017/exam-tracker
# JWT_SECRET=your_secret_key_here
# JWT_EXPIRE=7d
# NODE_ENV=development

# Seed sample exam data (optional but recommended)
npm run seed

# Start the backend
npm run dev
```

Backend will run on: `http://localhost:5000`

---

### Step 3: Frontend Setup

```bash
cd ../client

# Install dependencies
npm install

# Start the frontend development server
npm run dev
```

Frontend will run on: `http://localhost:3000`

---

## Testing the Application

### Create Test Account
1. Go to `http://localhost:3000`
2. Click "Register"
3. Fill in details and register
4. You'll be logged in automatically

### Test Features

**Dashboard:**
- View all exams
- Select exams you want to prepare for
- See exam dates and countdowns

**Study Roadmap:**
- Create a new study roadmap
- Select an exam and set dates
- Plan gets auto-populated with subjects from that exam

**Notifications:**
- See sample notifications from exams
- Filter by type (application, admit card, result)

**Profile:**
- View and edit your profile
- See your selected exams

---

## Common Issues & Solutions

### MongoDB Connection Failed
- Ensure MongoDB is running: `mongod`
- Check MONGODB_URI in server/.env is correct
- If using MongoDB Atlas, whitelist your IP

### Port Already in Use
```bash
# Kill process on port 5000
lsof -ti:5000 | xargs kill -9

# Kill process on port 3000
lsof -ti:3000 | xargs kill -9
```

### Dependencies Installation Failed
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### CORS Error
- Ensure backend is running on port 5000
- Check server/index.js has cors() enabled
- Verify vite.config.js proxy settings

---

## Project Structure Overview

```
Exam-Tracker/
├── server/                    # Backend - Express + MongoDB
│   ├── models/               # Database schemas
│   │   ├── User.js
│   │   ├── Exam.js
│   │   ├── StudyPlan.js
│   │   ├── Task.js
│   │   └── Notification.js
│   ├── controllers/          # Business logic
│   │   ├── authController.js
│   │   ├── examController.js
│   │   ├── studyPlanController.js
│   │   ├── taskController.js
│   │   └── notificationController.js
│   ├── routes/              # API endpoints
│   │   ├── auth.js
│   │   ├── exams.js
│   │   ├── studyPlans.js
│   │   ├── tasks.js
│   │   └── notifications.js
│   ├── middleware/          # Auth middleware
│   │   └── auth.js
│   ├── index.js             # Server entry point
│   ├── seed.js              # Sample data
│   ├── package.json
│   └── .env
│
├── client/                   # Frontend - React + Vite
│   ├── src/
│   │   ├── pages/           # Page components
│   │   │   ├── Home.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Roadmap.jsx
│   │   │   ├── Notifications.jsx
│   │   │   └── Profile.jsx
│   │   ├── components/      # Reusable components
│   │   │   ├── Header.jsx
│   │   │   └── Common.jsx
│   │   ├── context/         # Auth context
│   │   │   └── AuthContext.jsx
│   │   ├── services/        # API integration
│   │   │   └── api.js
│   │   ├── App.jsx          # Main app
│   │   ├── main.jsx         # Entry point
│   │   └── index.css        # Global styles
│   ├── index.html
│   ├── vite.config.js
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   ├── package.json
│   └── .env
│
├── README.md                # Main documentation
├── SETUP.md                 # This file
└── .gitignore
```

---

## API Usage Examples

### Authentication
```bash
# Register
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"John","email":"john@example.com","password":"pass123","confirmPassword":"pass123"}'

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john@example.com","password":"pass123"}'

# Get Profile (requires token)
curl -X GET http://localhost:5000/api/auth/profile \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

### Exams
```bash
# Get all exams
curl http://localhost:5000/api/exams

# Select an exam
curl -X POST http://localhost:5000/api/exams/select \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{"examId":"EXAM_ID_HERE"}'
```

---

## Deployment

### Backend (Heroku/Railway)
1. Set environment variables on deployment platform
2. Push to git
3. Platform auto-deploys

### Frontend (Vercel/Netlify)
1. Build: `npm run build`
2. Deploy dist folder
3. Set API endpoint to your backend URL

---

## Next Steps

- Explore the code
- Add more features
- Deploy to production
- Share with friends studying for exams!

---

Happy Learning! 📚
