import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext.jsx';
import { getProfile, updateProfile } from '../services/api.js';
import { Card, Button, Badge } from '../components/Common.jsx';

export const Profile = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    bio: '',
    profileImage: ''
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await getProfile();
      setProfile(response.data.user);
      setFormData({
        name: response.data.user.name,
        bio: response.data.user.bio || '',
        profileImage: response.data.user.profileImage || ''
      });
    } catch (error) {
      console.error('Error fetching profile:', error);
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
      await updateProfile(formData);
      fetchProfile();
      setEditMode(false);
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  if (loading) {
    return <div className="text-center py-20">Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <h1 className="text-4xl font-bold text-dark mb-8">Profile</h1>

      <Card>
        {/* Profile Header */}
        <div className="flex justify-between items-start mb-8 pb-8 border-b border-gray-200">
          <div className="flex gap-6">
            <div className="w-24 h-24 bg-primary rounded-full flex items-center justify-center text-4xl text-white">
              {formData.profileImage ? (
                <img src={formData.profileImage} alt="Profile" className="w-full h-full rounded-full object-cover" />
              ) : (
                '👤'
              )}
            </div>
            <div>
              <h2 className="text-3xl font-bold text-dark">{profile?.name}</h2>
              <p className="text-gray-600">{profile?.email}</p>
              <Badge type="info" className="mt-2">Active User</Badge>
            </div>
          </div>
          {!editMode && (
            <Button primary onClick={() => setEditMode(true)}>Edit Profile</Button>
          )}
        </div>

        {/* Edit Form */}
        {editMode ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-dark mb-2">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-dark mb-2">Bio</label>
              <textarea
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                rows="4"
                placeholder="Tell us about yourself"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-dark mb-2">Profile Image URL</label>
              <input
                type="url"
                name="profileImage"
                value={formData.profileImage}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="https://example.com/image.jpg"
              />
            </div>

            <div className="flex gap-4">
              <Button primary className="flex-1">Save Changes</Button>
              <Button className="flex-1" onClick={() => setEditMode(false)}>Cancel</Button>
            </div>
          </form>
        ) : (
          <>
            {/* Profile Info */}
            <div className="space-y-6">
              <div>
                <p className="text-sm text-gray-600 font-medium">Bio</p>
                <p className="text-gray-700 mt-1">{profile?.bio || 'No bio added yet'}</p>
              </div>

              <div>
                <p className="text-sm text-gray-600 font-medium">Email</p>
                <p className="text-gray-700 mt-1">{profile?.email}</p>
              </div>

              <div>
                <p className="text-sm text-gray-600 font-medium">Member Since</p>
                <p className="text-gray-700 mt-1">{new Date(profile?.createdAt).toLocaleDateString('en-IN')}</p>
              </div>

              {profile?.targetExams && profile.targetExams.length > 0 && (
                <div>
                  <p className="text-sm text-gray-600 font-medium mb-2">Selected Exams ({profile.targetExams.length})</p>
                  <div className="flex flex-wrap gap-2">
                    {profile.targetExams.map((exam, i) => (
                      <Badge key={i} type="info">
                        {exam.name || exam}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </>
        )}
      </Card>

      {/* Account Info */}
      <Card className="mt-8">
        <h3 className="text-2xl font-bold text-dark mb-4">Account Information</h3>
        <div className="space-y-3 text-sm text-gray-600">
          <p><strong>Account Type:</strong> Free User</p>
          <p><strong>Last Updated:</strong> {new Date(profile?.updatedAt).toLocaleDateString('en-IN')}</p>
          <p className="text-xs"><strong>User ID:</strong> {profile?._id}</p>
        </div>
      </Card>
    </div>
  );
};
