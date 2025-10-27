import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  Home,
  Brain,
  MessageSquare,
  FileText,
  AlertTriangle,
  LogOut,
  Menu,
  User,
  Sparkles
} from 'lucide-react';

const Layout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const { user, logout, showTimeoutWarning, resetTimeout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home, path: '/dashboard' },
    { id: 'quiz', label: 'Quiz Module', icon: Brain, path: '/quiz' },
    { id: 'chatbot', label: 'AI Assistant', icon: MessageSquare, path: '/chatbot' },
    { id: 'summarizer', label: 'Paper Summarizer', icon: FileText, path: '/summarizer' },
    { id: 'interaction', label: 'Drug Checker', icon: AlertTriangle, path: '/interaction' },
  ];

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className={`fixed left-0 top-0 h-full bg-white border-r border-gray-200 transition-all duration-300 z-50 ${
        isSidebarOpen ? 'w-64' : 'w-20'
      }`}>
        <div className="p-6">
          <div className="flex items-center gap-3 mb-8">
            <img 
              src="/logo.jpg" 
              alt="Med-G.AI Logo" 
              className="w-10 h-10 rounded-lg object-cover flex-shrink-0"
            />
            {isSidebarOpen && (
              <div>
                <h2 className="font-bold bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent">Med-G.AI</h2>
                <p className="text-xs text-gray-500">Healthcare Intelligence</p>
              </div>
            )}
          </div>

          <nav className="space-y-2">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => navigate(item.path)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                  location.pathname === item.path
                    ? 'bg-gradient-to-r from-teal-50 to-blue-50 text-teal-600'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <item.icon className="w-5 h-5 flex-shrink-0" />
                {isSidebarOpen && (
                  <span className="font-medium">{item.label}</span>
                )}
              </button>
            ))}
          </nav>
        </div>

        <div className="absolute bottom-6 left-0 right-0 px-6">
          <button
            onClick={handleLogout}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 transition`}
          >
            <LogOut className="w-5 h-5 flex-shrink-0" />
            {isSidebarOpen && <span className="font-medium">Logout</span>}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className={`transition-all duration-300 ${isSidebarOpen ? 'ml-64' : 'ml-20'}`}>
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-8 py-4 sticky top-0 z-40">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 hover:bg-gray-100 rounded-lg transition"
            >
              <Menu className="w-6 h-6 text-gray-600" />
            </button>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-teal-600 to-blue-600 rounded-full flex items-center justify-center">
                  <User className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="font-medium text-gray-900 text-sm">{user?.name || 'User'}</p>
                  <p className="text-xs text-gray-600 capitalize">{user?.role || 'Student'}</p>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-8">
          {children}
        </main>
      </div>

      {/* Timeout Warning Notification */}
      {showTimeoutWarning && (
        <div className="fixed bottom-4 right-4 bg-white rounded-lg shadow-2xl border-2 border-orange-500 p-6 max-w-sm z-50 animate-bounce">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
              <AlertTriangle className="w-6 h-6 text-orange-600" />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-gray-900 mb-1">Session Expiring Soon!</h3>
              <p className="text-sm text-gray-600 mb-3">
                You will be logged out in 1 minute due to inactivity.
              </p>
              <button
                onClick={resetTimeout}
                className="w-full px-4 py-2 bg-gradient-to-r from-teal-600 to-blue-600 text-white rounded-lg font-medium hover:from-teal-700 hover:to-blue-700 transition"
              >
                Stay Logged In
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Layout;
