import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Brain, 
  MessageSquare, 
  FileText, 
  AlertTriangle, 
  Users, 
  Target, 
  Lightbulb,
  ArrowRight,
  Sparkles,
  BookOpen,
  Award,
  TrendingUp
} from 'lucide-react';

const Home = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: Brain,
      title: 'AI-Powered Quiz System',
      description: 'Test your pharmaceutical knowledge with intelligent quizzes that adapt to your learning pace.',
      color: 'from-primary to-primary-500'
    },
    {
      icon: MessageSquare,
      title: 'Medical Chatbot',
      description: 'Get instant answers to your medical and pharmaceutical questions from our AI assistant.',
      color: 'from-secondary to-secondary-dark'
    },
    {
      icon: FileText,
      title: 'Research Paper Summarizer',
      description: 'Quickly understand complex research papers with AI-generated summaries and key insights.',
      color: 'from-primary-500 to-secondary'
    },
    {
      icon: AlertTriangle,
      title: 'Drug Interaction Checker',
      description: 'Ensure patient safety by checking potential drug interactions and contraindications.',
      color: 'from-secondary to-primary'
    },
    {
      icon: BookOpen,
      title: 'Smart Learning Modules',
      description: 'Access curated educational content designed for pharmacy students and professionals.',
      color: 'from-primary to-secondary-light'
    },
    {
      icon: Award,
      title: 'Progress Tracking',
      description: 'Monitor your learning journey with detailed analytics and performance insights.',
      color: 'from-primary-500 to-primary'
    }
  ];

  const teamMembers = [
    {
      name: 'Sayali Dhutadmal',
      role: 'Founder',
      description: 'PharmD Professional & Healthcare Innovator'
    },
    {
      name: 'Om Kinhikar',
      role: 'Co-Founder',
      description: 'PharmD Professional & Technology Enthusiast'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <img 
                src="/logo.jpg" 
                alt="Med-G.AI Logo" 
                className="w-10 h-10 rounded-lg object-cover"
              />
              <div>
                <h1 className="text-xl font-bold text-primary">
                  Med-G.AI
                </h1>
                <p className="text-xs text-text-secondary">Where Medicine Meets AI</p>
              </div>
            </div>
            <button
              onClick={() => navigate('/login')}
              className="px-6 py-2 bg-primary text-white rounded-lg font-medium hover:bg-secondary hover:shadow-lg transition-all duration-300"
            >
              Get Started
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <img 
            src="/logo.jpg" 
            alt="Med-G.AI Logo" 
            className="w-20 h-20 rounded-2xl mb-6 shadow-xl mx-auto object-cover"
          />
          <h1 className="text-5xl md:text-6xl font-bold text-text-primary mb-6">
            Welcome to <span className="text-primary">Med-G.AI</span>
          </h1>
          <p className="text-xl text-text-secondary mb-4 max-w-3xl mx-auto">
            Where Medicine Meets Artificial Intelligence
          </p>
          <p className="text-lg text-text-primary mb-8 max-w-4xl mx-auto leading-relaxed">
            Med-G.AI is an emerging healthcare innovation startup founded by passionate PharmD professionals and innovators. 
            Our mission is to integrate artificial intelligence into medical and pharmaceutical education, research, and innovation — 
            making healthcare smarter, faster, and more accessible.
          </p>
          <button
            onClick={() => navigate('/login')}
            className="inline-flex items-center px-8 py-4 bg-primary text-white rounded-xl font-semibold text-lg hover:bg-secondary hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
          >
            Start Your Journey
            <ArrowRight className="ml-2 w-5 h-5" />
          </button>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            <div className="bg-primary-50 rounded-2xl p-8 shadow-lg">
              <div className="w-14 h-14 bg-primary rounded-xl flex items-center justify-center mb-6">
                <Target className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-text-primary mb-4">🌍 Our Vision</h2>
              <p className="text-text-primary text-lg leading-relaxed">
                To revolutionize the medical and pharmaceutical ecosystem by merging AI with human intelligence, 
                nurturing a generation of tech-enabled healthcare professionals.
              </p>
            </div>

            <div className="bg-primary-100 rounded-2xl p-8 shadow-lg">
              <div className="w-14 h-14 bg-secondary rounded-xl flex items-center justify-center mb-6">
                <Lightbulb className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-text-primary mb-4">💡 Our Mission</h2>
              <p className="text-text-primary text-lg leading-relaxed">
                To empower every healthcare learner and researcher with AI-driven tools, mentorship, and opportunities 
                that enhance learning, research, and clinical decision-making.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-text-primary mb-4">Powerful AI-Driven Features</h2>
          <p className="text-xl text-text-secondary max-w-2xl mx-auto">
            Explore our comprehensive suite of tools designed to enhance your medical education and research
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100"
            >
              <div className={`w-14 h-14 bg-gradient-to-br ${feature.color} rounded-xl flex items-center justify-center mb-4`}>
                <feature.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-text-primary mb-3">{feature.title}</h3>
              <p className="text-text-secondary leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Team Section */}
      <section className="bg-primary py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">👥 Meet Our Team</h2>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Passionate healthcare professionals dedicated to transforming medical education
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {teamMembers.map((member, index) => (
              <div
                key={index}
                className="bg-white/10 backdrop-blur-md rounded-2xl p-8 text-center hover:bg-white/20 transition-all duration-300"
              >
                <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">{member.name}</h3>
                <p className="text-white/90 font-semibold mb-2">{member.role}</p>
                <p className="text-white/80">{member.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Community Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="bg-primary-50 rounded-3xl p-12 text-center shadow-xl">
          <TrendingUp className="w-16 h-16 text-primary mx-auto mb-6" />
          <h2 className="text-4xl font-bold text-text-primary mb-4">Join Our Community</h2>
          <p className="text-xl text-text-primary mb-8 max-w-3xl mx-auto">
            We aim to build a community where students, researchers, and healthcare professionals can collaborate, 
            learn, and innovate using AI-powered tools and resources. From research hubs to smart learning modules, 
            Med-G.AI is designed to be your one-stop platform for healthcare intelligence.
          </p>
          <button
            onClick={() => navigate('/login')}
            className="inline-flex items-center px-8 py-4 bg-primary text-white rounded-xl font-semibold text-lg hover:bg-secondary hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
          >
            Join Now
            <ArrowRight className="ml-2 w-5 h-5" />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <img 
              src="/logo.jpg" 
              alt="Med-G.AI Logo" 
              className="w-10 h-10 rounded-lg object-cover"
            />
            <h3 className="text-2xl font-bold">Med-G.AI</h3>
          </div>
          <p className="text-gray-400 mb-4">Where Medicine Meets Artificial Intelligence</p>
          <p className="text-gray-500 text-sm">
            © 2024 Med-G.AI. All rights reserved. | Founded by Sayali Dhutadmal & Om Kinhikar
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
