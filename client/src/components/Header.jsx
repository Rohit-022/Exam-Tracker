import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

export const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="bg-primary text-white shadow-lg">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2 text-2xl font-bold">
          <span className="text-accent">📚</span>
          Exam Tracker
        </Link>
        
        <nav className="hidden md:flex items-center gap-6">
          <Link to="/" className="hover:text-accent transition">Home</Link>
          {user && (
            <>
              <Link to="/dashboard" className="hover:text-accent transition">Dashboard</Link>
              <Link to="/roadmap" className="hover:text-accent transition">Roadmap</Link>
              <Link to="/notifications" className="hover:text-accent transition">Notifications</Link>
              <Link to="/profile" className="hover:text-accent transition">Profile</Link>
            </>
          )}
        </nav>

        <div className="flex items-center gap-4">
          {user ? (
            <>
              <span className="hidden sm:inline">Welcome, {user.name}</span>
              <button
                onClick={handleLogout}
                className="bg-accent text-dark px-4 py-2 rounded-lg font-semibold hover:bg-opacity-90 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:text-accent transition">Login</Link>
              <Link to="/register" className="bg-accent text-dark px-4 py-2 rounded-lg font-semibold hover:bg-opacity-90 transition">
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};
