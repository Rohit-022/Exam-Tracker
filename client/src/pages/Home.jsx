import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { Card, Button } from '../components/Common.jsx';

export const Home = () => {
  const { user } = useAuth();

  const exams = ['IBPS', 'SBI', 'SSC CGL', 'SSC CHSL', 'Railway Exams'];

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary to-blue-600">
      {/* Hero Section */}
      <section className="text-white py-20 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl font-bold mb-4">Welcome to Exam Tracker</h1>
          <p className="text-xl mb-8">Your comprehensive companion for government exam preparation</p>
          {!user && (
            <div className="flex justify-center gap-4">
              <Link to="/register">
                <Button primary className="text-lg px-8 py-3">Get Started</Button>
              </Link>
              <Link to="/login">
                <Button className="text-lg px-8 py-3 bg-white text-primary hover:bg-gray-100">Login</Button>
              </Link>
            </div>
          )}
          {user && (
            <Link to="/dashboard">
              <Button primary className="text-lg px-8 py-3">Go to Dashboard</Button>
            </Link>
          )}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 text-dark">Features</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card>
              <div className="text-4xl mb-4">📊</div>
              <h3 className="text-2xl font-bold mb-2">Progress Tracking</h3>
              <p className="text-gray-600">Track your preparation progress with visual dashboards and statistics</p>
            </Card>
            <Card>
              <div className="text-4xl mb-4">📝</div>
              <h3 className="text-2xl font-bold mb-2">Study Roadmap</h3>
              <p className="text-gray-600">Create customizable study plans with daily/weekly goals</p>
            </Card>
            <Card>
              <div className="text-4xl mb-4">📅</div>
              <h3 className="text-2xl font-bold mb-2">Exam Calendar</h3>
              <p className="text-gray-600">Stay updated with important exam dates and notifications</p>
            </Card>
          </div>
        </div>
      </section>

      {/* Exams Section */}
      <section className="py-16 px-4 bg-light">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 text-dark">Supported Exams</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4">
            {exams.map((exam) => (
              <Card key={exam} className="text-center">
                <h3 className="text-xl font-bold text-primary">{exam}</h3>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-dark text-white py-8 text-center">
        <p>&copy; 2024 Exam Tracker. All rights reserved.</p>
      </footer>
    </div>
  );
};
