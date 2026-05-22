# Commands Reference Guide

## 🚀 Getting Started Commands

### Initial Setup
```bash
# Backend
cd server
npm install
npm run seed              # Load sample exams

# Frontend (in new terminal)
cd client
npm install
```

---

## ▶️ Running the Application

### Development Mode (Recommended for Development)

**Terminal 1 - Backend Server:**
```bash
cd server
npm run dev
# Backend runs on: http://localhost:5000
```

**Terminal 2 - Frontend Development Server:**
```bash
cd client
npm run dev
# Frontend runs on: http://localhost:3000
```

### Production Mode

**Backend:**
```bash
cd server
npm start        # Runs compiled code
```

**Frontend:**
```bash
cd client
npm run build    # Create optimized build
npm run preview  # Preview the build locally
```

---

## 🛠️ Useful Commands

### Backend Commands

```bash
cd server

# Start development server with auto-reload
npm run dev

# Start production server
npm start

# Seed database with sample exam data
npm run seed

# Install dependencies
npm install

# Update dependencies
npm update

# View installed packages
npm list
```

### Frontend Commands

```bash
cd client

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Install dependencies
npm install

# Update dependencies
npm update

# View installed packages
npm list
```

---

## 📝 MongoDB Commands

### MongoDB Shell (mongosh)

```bash
# Connect to local MongoDB
mongosh

# In mongosh:
show dbs                           # Show all databases
use exam-tracker                   # Switch to exam-tracker database
show collections                   # Show all collections
db.exams.find()                    # View all exams
db.users.find()                    # View all users
db.users.count()                   # Count users
db.exams.deleteMany({})            # Delete all exams
db.dropDatabase()                  # Delete entire database
```

### MongoDB Atlas (Cloud)

```bash
# Get connection string from:
# MongoDB Atlas → Cluster → Connect → Drivers
# Copy connection string and paste in server/.env as MONGODB_URI
```

---

## 🔍 Testing & Debugging

### Test API Endpoints with cURL

```bash
# Health check
curl http://localhost:5000/api/health

# Register user
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name":"John Doe",
    "email":"john@example.com",
    "password":"pass123",
    "confirmPassword":"pass123"
  }'

# Login user
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email":"john@example.com",
    "password":"pass123"
  }'

# Get all exams
curl http://localhost:5000/api/exams

# Get exams with Bearer token
curl -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  http://localhost:5000/api/exams/select
```

### Using Postman

1. Download Postman from postman.com
2. Create new requests for each endpoint
3. Add Authorization header: `Bearer YOUR_TOKEN`
4. Test all API endpoints

---

## 🧹 Cleaning Up

### Clear Node Modules (Free up space)

```bash
# Backend
cd server
rm -rf node_modules package-lock.json
npm install

# Frontend
cd client
rm -rf node_modules package-lock.json
npm install
```

### Clear npm Cache

```bash
npm cache clean --force
```

### Reset MongoDB

```bash
# In mongosh:
use exam-tracker
db.dropDatabase()

# Then reseed:
cd server
npm run seed
```

---

## 🐛 Troubleshooting Commands

### Check if Port is In Use

```bash
# Check port 5000 (backend)
lsof -ti:5000

# Check port 3000 (frontend)
lsof -ti:3000

# Kill process on port 5000
lsof -ti:5000 | xargs kill -9

# Kill process on port 3000
lsof -ti:3000 | xargs kill -9
```

### Check Node and npm Versions

```bash
node --version                    # Should be v14 or higher
npm --version                     # Should be v6 or higher
```

### Check MongoDB Status

```bash
# macOS/Linux with Homebrew
brew services list mongodb-community

# Windows - Check Services:
# Services → MongoDB Server
```

### View Application Logs

```bash
# Backend logs: Check terminal where npm run dev is running
# Frontend logs: Check terminal where npm run dev is running
# Browser console: F12 in browser
```

---

## 📦 Dependency Management

### Add New Packages

```bash
# Backend
cd server
npm install package-name

# Frontend
cd client
npm install package-name

# Install as dev dependency
npm install --save-dev package-name
```

### Remove Packages

```bash
npm uninstall package-name
```

### Update Packages

```bash
# Update all packages
npm update

# Update specific package
npm update package-name
```

---

## 🚀 Deployment Commands

### Build for Production

```bash
# Backend (no build needed, already Node.js)
# Just ensure all dependencies are installed

# Frontend
cd client
npm run build              # Creates dist folder

# Check build size
du -sh dist/
```

### Prepare for Deployment

```bash
# Backend deployment checklist:
# 1. Update .env with production values
# 2. Change JWT_SECRET to a strong secret
# 3. Set NODE_ENV=production
# 4. Use MongoDB Atlas for production database

# Frontend deployment checklist:
# 1. Update VITE_API_URL to production backend URL
# 2. Run npm run build
# 3. Deploy dist folder to hosting service
```

---

## 📱 Environment Variables

### Backend (.env)
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/exam-tracker
JWT_SECRET=your_secret_key_here
JWT_EXPIRE=7d
NODE_ENV=development
```

### Frontend (.env)
```
VITE_API_URL=http://localhost:5000/api
```

---

## 🔗 Useful Links

- Node.js: https://nodejs.org
- MongoDB: https://www.mongodb.com
- Express.js: https://expressjs.com
- React: https://react.dev
- Vite: https://vitejs.dev
- Tailwind CSS: https://tailwindcss.com
- Postman: https://www.postman.com

---

## 💡 Git Commands (Optional)

```bash
# Initialize git repository
git init

# Add all files
git add .

# Commit changes
git commit -m "Initial commit: Exam Tracker MERN app"

# Add remote repository
git remote add origin https://github.com/yourusername/exam-tracker.git

# Push to GitHub
git push -u origin main
```

---

## 🎯 Quick Command Shortcuts

Create bash/batch file for quick startup:

### On macOS/Linux (save as start.sh):
```bash
#!/bin/bash
echo "Starting Exam Tracker..."
cd server && npm run dev &
cd client && npm run dev
```

### On Windows (save as start.bat):
```batch
@echo off
start cmd /k "cd server && npm run dev"
start cmd /k "cd client && npm run dev"
```

Run with: `./start.sh` (Linux/Mac) or `start.bat` (Windows)

---

## 📊 Monitor Application

### Check Backend Health
```bash
curl http://localhost:5000/api/health
# Should return: {"message":"Server is running"}
```

### Check Frontend
```bash
# Open browser to http://localhost:3000
# Check browser console for errors (F12)
```

---

**Save this file for quick reference while developing!** 📝
