import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { userAPI } from '../services/api';
import {
  CheckCircle,
  TrendingUp,
  FileText,
  Trophy,
  Brain,
  MessageSquare,
  AlertTriangle
} from 'lucide-react';

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState(null);
  const [activity, setActivity] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, [user]);

  const fetchDashboardData = async () => {
    try {
      const [statsRes, activityRes] = await Promise.all([
        userAPI.getStats(),
        userAPI.getActivity()
      ]);
      
      setStats(statsRes.data.data);
      setActivity(activityRes.data.data);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    { 
      label: 'Quizzes Completed', 
      value: user?.stats?.quizzesCompleted || 0, 
      icon: CheckCircle, 
      color: 'text-green-600', 
      bg: 'bg-green-100' 
    },
    { 
      label: 'Study Streak', 
      value: `${user?.stats?.studyStreak || 0} days`, 
      icon: TrendingUp, 
      color: 'text-blue-600', 
      bg: 'bg-blue-100' 
    },
    { 
      label: 'Papers Summarized', 
      value: user?.stats?.papersSummarized || 0, 
      icon: FileText, 
      color: 'text-purple-600', 
      bg: 'bg-purple-100' 
    },
    { 
      label: 'Total Score', 
      value: user?.stats?.totalScore || 0, 
      icon: Trophy, 
      color: 'text-yellow-600', 
      bg: 'bg-yellow-100' 
    }
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Welcome back, {user?.name}! 👋</h1>
        <p className="text-gray-600 mt-2">Here's your learning progress today</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => (
          <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-900 mt-2">{stat.value}</p>
              </div>
              <div className={`${stat.bg} p-3 rounded-lg`}>
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-8 text-white">
        <h2 className="text-2xl font-bold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button
            onClick={() => navigate('/quiz')}
            className="bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-lg p-4 transition text-center"
          >
            <Brain className="w-8 h-8 mx-auto mb-2" />
            <p className="font-medium">Take Quiz</p>
          </button>
          <button
            onClick={() => navigate('/chatbot')}
            className="bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-lg p-4 transition text-center"
          >
            <MessageSquare className="w-8 h-8 mx-auto mb-2" />
            <p className="font-medium">Ask AI</p>
          </button>
          <button
            onClick={() => navigate('/summarizer')}
            className="bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-lg p-4 transition text-center"
          >
            <FileText className="w-8 h-8 mx-auto mb-2" />
            <p className="font-medium">Summarize</p>
          </button>
          <button
            onClick={() => navigate('/interaction')}
            className="bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-lg p-4 transition text-center"
          >
            <AlertTriangle className="w-8 h-8 mx-auto mb-2" />
            <p className="font-medium">Check Drug</p>
          </button>
        </div>
      </div>

      {activity.length > 0 && (
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Activity</h2>
          <div className="space-y-4">
            {activity.map((item, index) => (
              <div key={index} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition">
                <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                <div className="flex-1">
                  <p className="font-medium text-gray-900">{item.title}</p>
                  <p className="text-sm text-gray-600">
                    {new Date(item.time).toLocaleDateString()} - Score: {item.score}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {stats?.averageScore !== undefined && (
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Performance Overview</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <p className="text-sm text-gray-600 mb-1">Average Score</p>
              <p className="text-3xl font-bold text-blue-600">{stats.averageScore}</p>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <p className="text-sm text-gray-600 mb-1">Total Quizzes</p>
              <p className="text-3xl font-bold text-green-600">{stats.totalQuizzes}</p>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <p className="text-sm text-gray-600 mb-1">Success Rate</p>
              <p className="text-3xl font-bold text-purple-600">
                {stats.averageScore > 0 ? Math.round((stats.averageScore / 100) * 100) : 0}%
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
