import React, { useState, useEffect } from 'react';
import { getStudyPlans, createStudyPlan, deleteStudyPlan, getTasks } from '../services/api.js';
import { Card, Button, Badge, ProgressBar } from '../components/Common.jsx';
// import { getAllExams } from '../services/api.js';

const mockExams = [
  {
    _id: '1',
    name: 'SSC CGL',
    syllabus: [
      {
        subject: 'Quantitative Aptitude',
        topics: ['Percentage', 'Profit & Loss', 'Time & Work']
      },
      {
        subject: 'Reasoning',
        topics: ['Coding-Decoding', 'Series', 'Puzzles']
      }
    ]
  },
  {
    _id: '2',
    name: 'Bank PO',
    syllabus: [
      {
        subject: 'English',
        topics: ['Grammar', 'Reading Comprehension']
      },
      {
        subject: 'Reasoning',
        topics: ['Seating Arrangement', 'Blood Relation']
      }
    ]
  },
  {
    _id: '3',
    name: 'Railway Group D',
    syllabus: [
      {
        subject: 'General Science',
        topics: ['Physics', 'Chemistry', 'Biology']
      }
    ]
  }
];
export const Roadmap = () => {
  const [studyPlans, setStudyPlans] = useState([]);
  const [exams, setExams] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    examId: '',
    title: '',
    description: '',
    startDate: '',
    endDate: ''
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const plansRes = await getStudyPlans();

setStudyPlans(plansRes.data.studyPlans);
setExams(mockExams);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const syllabusProgress = [];
      const selectedExam = exams.find(ex => ex._id === formData.examId);
      
      if (selectedExam && selectedExam.syllabus) {
        selectedExam.syllabus.forEach(subject => {
          syllabusProgress.push({
            subject: subject.subject,
            topics: subject.topics.map(topic => ({ name: topic, completed: false })),
            completionPercentage: 0
          });
        });
      }

      await createStudyPlan({
        ...formData,
        syllabusProgress
      });

      fetchData();
      setShowForm(false);
      setFormData({ examId: '', title: '', description: '', startDate: '', endDate: '' });
    } catch (error) {
      console.error('Error creating study plan:', error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this study plan?')) {
      try {
        await deleteStudyPlan(id);
        fetchData();
      } catch (error) {
        console.error('Error deleting study plan:', error);
      }
    }
  };

  if (loading) {
    return <div className="text-center py-20">Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-dark">Study Roadmap</h1>
        <Button primary onClick={() => setShowForm(!showForm)}>
          {showForm ? 'Cancel' : '+ New Roadmap'}
        </Button>
      </div>

      {/* Create Form */}
      {showForm && (
        <Card className="mb-8">
          <h2 className="text-2xl font-bold mb-4 text-dark">Create New Study Roadmap</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-dark mb-2">Select Exam</label>
                <select
                  name="examId"
                  value={formData.examId}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="">Choose an exam</option>
                  {exams.map(exam => (
                    <option key={exam._id} value={exam._id}>{exam.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-dark mb-2">Title</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="e.g., SSC CGL 2024 Preparation"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-dark mb-2">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                rows="3"
                placeholder="Add notes about your preparation strategy"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-dark mb-2">Start Date</label>
                <input
                  type="date"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-dark mb-2">End Date</label>
                <input
                  type="date"
                  name="endDate"
                  value={formData.endDate}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>

            <Button primary className="w-full">Create Roadmap</Button>
          </form>
        </Card>
      )}

      {/* Study Plans List */}
      {studyPlans.length === 0 ? (
        <Card className="text-center py-12">
          <p className="text-gray-600 text-lg">No study roadmaps yet. Create one to get started!</p>
        </Card>
      ) : (
        <div className="space-y-6">
          {studyPlans.map(plan => (
            <Card key={plan._id} className={!plan.isActive ? 'opacity-75' : ''}>
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-2xl font-bold text-dark">{plan.title}</h3>
                  <p className="text-gray-600">{plan.examId?.name}</p>
                </div>
                <Badge type={plan.isActive ? 'success' : 'warning'}>
                  {plan.isActive ? 'Active' : 'Inactive'}
                </Badge>
              </div>

              {plan.description && (
                <p className="text-gray-600 mb-4">{plan.description}</p>
              )}

              <div className="grid md:grid-cols-3 gap-4 mb-4">
                <div>
                  <p className="text-sm text-gray-600">Start Date</p>
                  <p className="font-semibold">{new Date(plan.startDate).toLocaleDateString('en-IN')}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">End Date</p>
                  <p className="font-semibold">{new Date(plan.endDate).toLocaleDateString('en-IN')}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Progress</p>
                  <p className="font-semibold text-secondary">{plan.overallProgress}%</p>
                </div>
              </div>

              <div className="mb-4">
                <p className="text-sm text-gray-600 mb-2">Overall Progress</p>
                <ProgressBar completed={plan.overallProgress} total={100} />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <Button primary>View Details</Button>
                <Button 
                  className="bg-red-100 text-red-700 hover:bg-red-200"
                  onClick={() => handleDelete(plan._id)}
                >
                  Delete
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};
