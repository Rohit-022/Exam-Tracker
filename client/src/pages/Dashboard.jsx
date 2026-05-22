import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext.jsx';
import { getAllExams, selectExam, deselectExam } from '../services/api.js';
import { Card, Button, Badge, ProgressBar } from '../components/Common.jsx';

export const Dashboard = () => {
  const { user } = useAuth();
  const [exams, setExams] = useState([]);
  const [selectedExams, setSelectedExams] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchExams();
  }, []);

  const fetchExams = async () => {
    try {
      const response = await getAllExams();
      setExams(response.data.exams);
      const selected = user?.targetExams || [];
      setSelectedExams(selected.map(e => e._id || e));
    } catch (error) {
      console.error('Error fetching exams:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectExam = async (examId) => {
    try {
      await selectExam(examId);
      setSelectedExams([...selectedExams, examId]);
    } catch (error) {
      console.error('Error selecting exam:', error);
    }
  };

  const handleDeselectExam = async (examId) => {
    try {
      await deselectExam(examId);
      setSelectedExams(selectedExams.filter(id => id !== examId));
    } catch (error) {
      console.error('Error deselecting exam:', error);
    }
  };

  const isSelected = (examId) => selectedExams.includes(examId);

  const getDaysLeft = (examDate) => {
    const today = new Date();
    const examDay = new Date(examDate);
    const daysLeft = Math.ceil((examDay - today) / (1000 * 60 * 60 * 24));
    return daysLeft;
  };

  if (loading) {
    return <div className="text-center py-20">Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-dark mb-8">Dashboard</h1>

      {/* Selected Exams Summary */}
      {selectedExams.length > 0 && (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {exams.filter(exam => isSelected(exam._id)).map((exam) => (
            <Card key={exam._id}>
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-2xl font-bold text-primary">{exam.name}</h3>
                <Badge type="info">Selected</Badge>
              </div>
              
              <div className="space-y-3 mb-4">
                <div>
                  <p className="text-sm text-gray-600">Exam Date</p>
                  <p className="font-semibold">{new Date(exam.examDate).toLocaleDateString('en-IN')}</p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-600">Days Left</p>
                  <p className={`font-bold text-lg ${getDaysLeft(exam.examDate) <= 30 ? 'text-red-600' : 'text-secondary'}`}>
                    {Math.max(0, getDaysLeft(exam.examDate))} days
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-600">Marks</p>
                  <p className="font-semibold">{exam.totalMarks}</p>
                </div>
              </div>

              <Button 
                className="w-full bg-red-100 text-red-700 hover:bg-red-200"
                onClick={() => handleDeselectExam(exam._id)}
              >
                Remove
              </Button>
            </Card>
          ))}
        </div>
      )}

      {/* All Exams */}
      <div>
        <h2 className="text-3xl font-bold text-dark mb-6">All Exams</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {exams.map((exam) => (
            <Card key={exam._id} className={isSelected(exam._id) ? 'ring-2 ring-primary' : ''}>
              <h3 className="text-2xl font-bold text-primary mb-3">{exam.name}</h3>
              
              <div className="space-y-2 mb-4 text-sm text-gray-600">
                <p><strong>Applications:</strong> {new Date(exam.applicationStartDate).toLocaleDateString('en-IN')}</p>
                <p><strong>Exam:</strong> {new Date(exam.examDate).toLocaleDateString('en-IN')}</p>
                <p><strong>Marks:</strong> {exam.totalMarks}</p>
                <p><strong>Duration:</strong> {exam.duration}</p>
              </div>

              <Button 
                primary={!isSelected(exam._id)}
                className={`w-full ${isSelected(exam._id) ? 'bg-gray-300 text-dark' : ''}`}
                onClick={() => isSelected(exam._id) ? handleDeselectExam(exam._id) : handleSelectExam(exam._id)}
              >
                {isSelected(exam._id) ? 'Selected' : 'Select'}
              </Button>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};
