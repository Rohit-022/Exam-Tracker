# Exam Tracker - Full Stack MERN Application

A comprehensive web application for government exam aspirants to track exams, manage study plans, and monitor preparation progress.

## Features

- **User Authentication**: Secure registration and login with JWT
- **Exam Dashboard**: Track target exams with countdown and progress
- **Study Roadmap**: Create custom study plans with syllabus tracking
- **Task Management**: Daily/weekly task management with progress tracking
- **Notifications**: Stay updated with important exam notifications
- **User Profile**: Customize your profile and manage preferences

## Project Structure

```
exam-tracker/
├── server/                 # Backend (Node.js + Express)
│   ├── models/            # MongoDB schemas
│   ├── routes/            # API routes
│   ├── controllers/        # Business logic
│   ├── middleware/         # Auth middleware
│   ├── index.js           # Server entry point
│   └── package.json       # Dependencies
│
├── client/                 # Frontend (React + Vite)
│   ├── src/
│   │   ├── pages/         # React pages
│   │   ├── components/    # Reusable components
│   │   ├── context/       # Auth context
│   │   ├── services/      # API calls
│   │   ├── App.jsx        # Main app component
│   │   └── main.jsx       # Entry point
│   ├── index.html         # HTML template
│   ├── vite.config.js     # Vite configuration
│   └── package.json       # Dependencies
```

## Tech Stack

**Backend:**
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- bcryptjs

**Frontend:**
- React 18
- Vite
- React Router v6
- Axios
- Tailwind CSS

## Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- MongoDB (local or cloud)

### Backend Setup

1. Navigate to the server directory:
```bash
cd server
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file with:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/exam-tracker
JWT_SECRET=your_secret_key_here_change_in_production
JWT_EXPIRE=7d
NODE_ENV=development
```

4. Start the server:
```bash
npm run dev
```

The backend will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to the client directory:
```bash
cd ../client
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The frontend will run on `http://localhost:3000`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get user profile
- `PUT /api/auth/profile` - Update profile

### Exams
- `GET /api/exams` - Get all exams
- `GET /api/exams/:id` - Get exam details
- `POST /api/exams/select` - Select an exam
- `POST /api/exams/deselect` - Deselect an exam

### Study Plans
- `POST /api/study-plans` - Create study plan
- `GET /api/study-plans` - Get all user's study plans
- `GET /api/study-plans/:id` - Get study plan details
- `PUT /api/study-plans/:id` - Update study plan
- `DELETE /api/study-plans/:id` - Delete study plan

### Tasks
- `POST /api/tasks` - Create task
- `GET /api/tasks` - Get tasks
- `PUT /api/tasks/:id` - Update task
- `DELETE /api/tasks/:id` - Delete task

### Notifications
- `GET /api/notifications` - Get all notifications
- `GET /api/notifications/exam/:examId` - Get exam's notifications
- `POST /api/notifications` - Create notification
- `DELETE /api/notifications/:id` - Delete notification

## Database Collections

1. **Users** - User accounts and authentication
2. **Exams** - Government examination details
3. **StudyPlans** - User's study roadmaps
4. **Tasks** - Todo items and daily goals
5. **Notifications** - Important exam updates

## Pages

1. **Home** - Landing page with features overview
2. **Login** - User login page
3. **Register** - New user registration
4. **Dashboard** - Exam tracking and selection
5. **Roadmap** - Study plan management
6. **Notifications** - Exam notifications center
7. **Profile** - User profile and settings

## Features in Detail

### Dashboard
- View all available exams
- Select/deselect target exams
- See countdown and progress for selected exams
- Quick statistics

### Study Roadmap
- Create custom study roadmaps for exams
- Track syllabus completion by subject
- Overall progress tracking
- Multiple roadmaps for different exams

### Tasks & Checklist
- Create daily/weekly tasks
- Set priorities
- Mark tasks as complete
- Checklist items within tasks
- Task filtering and sorting

### Notifications
- Application date updates
- Admit card notifications
- Result announcements
- Filter by notification type
- Mark important notifications

## Security Features

- Password hashing with bcryptjs
- JWT token-based authentication
- Secure token storage
- Protected routes
- Authorization checks

## Future Enhancements

- Email notifications
- Study material resources
- Previous year question papers
- Progress analytics and charts
- Peer study groups
- Video tutorials integration
- Mock tests
- Dark mode

## Contributing

Feel free to fork this project and submit pull requests for any improvements.

## License

This project is open source and available under the MIT License.

## Support

For any issues or questions, please create an issue in the GitHub repository.

---

**Happy Learning! 📚**
