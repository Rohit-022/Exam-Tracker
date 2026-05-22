import React, { useState, useEffect } from 'react';
import { getAllNotifications } from '../services/api.js';
import { Card, Badge } from '../components/Common.jsx';

export const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      const response = await getAllNotifications();
      setNotifications(response.data.notifications);
    } catch (error) {
      console.error('Error fetching notifications:', error);
    } finally {
      setLoading(false);
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'application': return 'info';
      case 'admit_card': return 'warning';
      case 'result': return 'success';
      default: return 'default';
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'application': return '📋';
      case 'admit_card': return '🎫';
      case 'result': return '🏆';
      default: return '📢';
    }
  };

  const filteredNotifications = filter === 'all' 
    ? notifications 
    : notifications.filter(n => n.type === filter);

  const sortedNotifications = [...filteredNotifications].sort((a, b) => 
    new Date(b.notificationDate) - new Date(a.notificationDate)
  );

  if (loading) {
    return <div className="text-center py-20">Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-dark mb-8">Notifications</h1>

      {/* Filter Buttons */}
      <div className="flex flex-wrap gap-2 mb-8">
        {['all', 'application', 'admit_card', 'result'].map(type => (
          <button
            key={type}
            onClick={() => setFilter(type)}
            className={`px-4 py-2 rounded-lg font-medium transition ${
              filter === type
                ? 'bg-primary text-white'
                : 'bg-gray-200 text-dark hover:bg-gray-300'
            }`}
          >
            {type.charAt(0).toUpperCase() + type.slice(1).replace('_', ' ')}
          </button>
        ))}
      </div>

      {/* Notifications List */}
      {sortedNotifications.length === 0 ? (
        <Card className="text-center py-12">
          <p className="text-gray-600 text-lg">No notifications for this filter</p>
        </Card>
      ) : (
        <div className="space-y-4">
          {sortedNotifications.map(notification => (
            <Card 
              key={notification._id}
              className={notification.important ? 'border-l-4 border-accent' : ''}
            >
              <div className="flex justify-between items-start mb-3">
                <div className="flex gap-3 flex-1">
                  <span className="text-3xl">{getTypeIcon(notification.type)}</span>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-dark">{notification.title}</h3>
                    <p className="text-gray-600 text-sm">
                      {notification.examId?.name} • {new Date(notification.notificationDate).toLocaleDateString('en-IN')}
                    </p>
                  </div>
                </div>
                <Badge type={getTypeColor(notification.type)}>
                  {notification.type.replace('_', ' ')}
                </Badge>
              </div>

              <p className="text-gray-700 mb-3">{notification.content}</p>

              {notification.link && (
                <a 
                  href={notification.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary font-semibold hover:underline"
                >
                  View More →
                </a>
              )}
              
              {notification.important && (
                <div className="mt-3 pt-3 border-t border-gray-200">
                  <span className="text-red-600 font-semibold text-sm">⚠️ Important</span>
                </div>
              )}
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};
