import React, { useState, useEffect } from 'react';
import { quizAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { Trophy, Clock, CheckCircle, ArrowLeft, Sparkles, Brain, Target, Zap } from 'lucide-react';

const QuizModule = () => {
  const { refreshUser } = useAuth();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedDifficulty, setSelectedDifficulty] = useState(null);
  const [quiz, setQuiz] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [quizStarted, setQuizStarted] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [leaderboard, setLeaderboard] = useState([]);

  const categories = [
    { name: 'Pharmacology', icon: '💊' },
    { name: 'Clinical Pharmacy', icon: '🏥' },
    { name: 'Medicinal Chemistry', icon: '🧪'}
  ];

  const difficulties = [
    { level: 'Beginner', color: 'from-green-500 to-green-600' },
    { level: 'Intermediate', color: 'from-yellow-500 to-orange-600' },
    { level: 'Advanced', color: 'from-red-500 to-red-600' }
  ];

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  const fetchLeaderboard = async () => {
    try {
      const response = await quizAPI.getLeaderboard();
      setLeaderboard(response.data.data);
    } catch (error) {
      console.error('Error fetching leaderboard:', error);
    }
  };

  const generateQuiz = async (difficulty) => {
    if (!selectedCategory) {
      alert('Please select a category first');
      return;
    }
    if (!difficulty) {
      alert('Please select a difficulty level');
      return;
    }
    
    setLoading(true);
    try {
      const response = await quizAPI.generateQuiz({
        category: selectedCategory.name,
        difficulty: difficulty.level,
        numberOfQuestions: 10
      });
      setQuiz(response.data.data);
      setQuizStarted(true);
      setStartTime(Date.now());
      setAnswers([]);
      setCurrentQuestion(0);
    } catch (error) {
      console.error('Error generating quiz:', error);
      alert('Failed to generate quiz. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleAnswerSelect = (answerIndex) => {
    setSelectedAnswer(answerIndex);
  };

  const handleNextQuestion = () => {
    const newAnswers = [...answers, selectedAnswer];
    setAnswers(newAnswers);

    if (currentQuestion < quiz.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
    } else {
      submitQuiz(newAnswers);
    }
  };

  const submitQuiz = async (finalAnswers) => {
    const timeTaken = Math.floor((Date.now() - startTime) / 1000);
    
    try {
      const response = await quizAPI.submitQuiz({
        quizId: quiz._id,
        answers: finalAnswers,
        timeTaken
      });
      setResult(response.data.data);
      setQuizCompleted(true);
      fetchLeaderboard();
      // Refresh user data to update dashboard stats
      await refreshUser();
    } catch (error) {
      console.error('Error submitting quiz:', error);
      alert('Failed to submit quiz. Please try again.');
    }
  };

  const resetQuiz = () => {
    setSelectedCategory(null);
    setSelectedDifficulty(null);
    setQuiz(null);
    setQuizStarted(false);
    setQuizCompleted(false);
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setAnswers([]);
    setResult(null);
  };

  // Category Selection View
  if (!selectedCategory) {
    return (
      <div className="space-y-6">
        <div className="bg-primary rounded-2xl p-8 text-white shadow-xl">
          <div className="flex items-center gap-3 mb-3">
            <Brain className="w-10 h-10" />
            <h1 className="text-4xl font-bold">AI-Powered Quiz Module</h1>
          </div>
          <p className="text-white/90 text-lg flex items-center gap-2">
            <Sparkles className="w-5 h-5" />
            Test your pharmacy knowledge with AI-generated questions
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category, index) => (
            <button
              key={index}
              onClick={() => setSelectedCategory(category)}
              className="bg-white rounded-2xl p-6 shadow-md border-2 border-gray-100 hover:shadow-2xl hover:border-primary hover:scale-105 transition-all duration-300 text-left group relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary-50 rounded-full -mr-16 -mt-16 opacity-50"></div>
              <div className="relative">
                <div className="text-5xl mb-4 transform group-hover:scale-110 transition-transform">{category.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{category.name}</h3>
                <p className="text-gray-600 mb-4">{category.quizzes} AI-generated quizzes</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-primary font-medium group-hover:translate-x-2 transition-transform">
                    <Target className="w-4 h-4 mr-2" />
                    Start Quiz
                  </div>
                  <Zap className="w-5 h-5 text-yellow-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </div>
            </button>
          ))}
        </div>

        {leaderboard.length > 0 && (
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center gap-2 mb-4">
              <Trophy className="w-6 h-6 text-yellow-600" />
              <h2 className="text-xl font-bold text-gray-900">Leaderboard</h2>
            </div>
            <div className="space-y-3">
              {leaderboard.slice(0, 10).map((user, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 rounded-lg bg-gray-50"
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                      user.rank === 1 ? 'bg-yellow-400 text-yellow-900' :
                      user.rank === 2 ? 'bg-gray-300 text-gray-900' :
                      user.rank === 3 ? 'bg-orange-400 text-orange-900' :
                      'bg-gray-200 text-gray-700'
                    }`}>
                      {user.rank}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{user.name}</p>
                      <p className="text-sm text-gray-600">{user.university}</p>
                    </div>
                  </div>
                  <p className="font-bold text-gray-900">{user.score} pts</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }

  // Difficulty Selection View
  if (!selectedDifficulty) {
    return (
      <div className="space-y-6">
        <button
          onClick={() => setSelectedCategory(null)}
          className="text-primary hover:text-secondary flex items-center gap-2 font-medium hover:gap-3 transition-all"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to categories
        </button>

        <div className="bg-primary-50 rounded-2xl p-8 border-2 border-primary-200">
          <div className="flex items-center gap-3">
            <div className="text-5xl">{selectedCategory.icon}</div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{selectedCategory.name}</h1>
              <p className="text-gray-600 mt-1 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-yellow-600" />
                Choose your difficulty level for AI-generated questions
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {difficulties.map((diff, index) => (
            <button
              key={index}
              onClick={() => {
                setSelectedDifficulty(diff);
                generateQuiz(diff);
              }}
              className={`bg-gradient-to-br ${diff.color} text-white rounded-2xl p-10 shadow-xl hover:shadow-2xl hover:scale-110 transition-all duration-300 relative overflow-hidden group`}
            >
              <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity"></div>
              <div className="relative">
                <div className="flex justify-center mb-4">
                  <Target className="w-12 h-12 transform group-hover:rotate-12 transition-transform" />
                </div>
                <h3 className="text-3xl font-bold mb-3">{diff.level}</h3>
                <p className="opacity-90 text-lg">AI-Powered Questions</p>
                <div className="mt-4 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Zap className="w-5 h-5" />
                  <span className="font-medium">Start Now</span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    );
  }

  // Loading View
  if (loading) {
    return (
      <div className="max-w-2xl mx-auto text-center py-16">
        <div className="relative">
          <div className="w-24 h-24 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
          <Brain className="w-10 h-10 text-primary absolute top-7 left-1/2 transform -translate-x-1/2 animate-pulse" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-3 flex items-center justify-center gap-2">
          <Sparkles className="w-6 h-6 text-yellow-500" />
          AI Generating Quiz...
        </h2>
        <p className="text-gray-600 text-lg">Creating personalized {selectedDifficulty?.level} level questions on {selectedCategory?.name}</p>
        <div className="mt-6 flex justify-center gap-2">
          <div className="w-3 h-3 bg-primary rounded-full animate-bounce" style={{animationDelay: '0s'}}></div>
          <div className="w-3 h-3 bg-secondary rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
          <div className="w-3 h-3 bg-primary-500 rounded-full animate-bounce" style={{animationDelay: '0.4s'}}></div>
        </div>
      </div>
    );
  }

  // Quiz Completed View
  if (quizCompleted && result) {
    return (
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-100 text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Trophy className="w-10 h-10 text-green-600" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Quiz Completed!</h2>
          <p className="text-gray-600 mb-6">Great job on completing the quiz</p>
          
          <div className="bg-primary text-white rounded-xl p-6 mb-6">
            <p className="text-lg mb-2">Your Score</p>
            <p className="text-5xl font-bold">{result.score}/{result.totalQuestions * 10}</p>
            <p className="mt-2 opacity-90">{result.percentage.toFixed(0)}% Correct</p>
          </div>

          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-sm text-gray-600">Questions</p>
              <p className="text-2xl font-bold text-gray-900">{result.totalQuestions}</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-sm text-gray-600">Correct</p>
              <p className="text-2xl font-bold text-gray-900">{result.score / 10}</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-sm text-gray-600">Category</p>
              <p className="text-lg font-bold text-gray-900">{selectedCategory.icon}</p>
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={resetQuiz}
              className="flex-1 bg-gray-100 text-gray-900 py-3 rounded-lg font-medium hover:bg-gray-200 transition"
            >
              Back to Quizzes
            </button>
            <button
              onClick={() => {
                setQuizCompleted(false);
                setQuizStarted(false);
                generateQuiz(selectedDifficulty);
              }}
              className="flex-1 bg-primary text-white py-3 rounded-lg font-medium hover:bg-secondary transition"
            >
              Retake Quiz
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Quiz In Progress View
  if (quizStarted && quiz && currentQuestion < quiz.questions.length) {
    const question = quiz.questions[currentQuestion];
    
    return (
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600">Question {currentQuestion + 1} of {quiz.questions.length}</p>
            <div className="w-64 h-2 bg-gray-200 rounded-full mt-2">
              <div
                className="h-full bg-primary rounded-full transition-all"
                style={{ width: `${((currentQuestion + 1) / quiz.questions.length) * 100}%` }}
              ></div>
            </div>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <Clock className="w-5 h-5" />
            <span className="font-medium">
              {Math.floor((Date.now() - startTime) / 1000)}s
            </span>
          </div>
        </div>

        <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-100">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">{question.question}</h2>
          
          <div className="space-y-3">
            {question.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerSelect(index)}
                className={`w-full text-left p-4 rounded-lg border-2 transition ${
                  selectedAnswer === index
                    ? 'border-primary bg-primary-50'
                    : 'border-gray-200 hover:border-gray-300 bg-white'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                    selectedAnswer === index
                      ? 'border-primary bg-primary'
                      : 'border-gray-300'
                  }`}>
                    {selectedAnswer === index && (
                      <CheckCircle className="w-4 h-4 text-white" />
                    )}
                  </div>
                  <span className="font-medium text-gray-900">{option}</span>
                </div>
              </button>
            ))}
          </div>

          <button
            onClick={handleNextQuestion}
            disabled={selectedAnswer === null}
            className="w-full mt-6 bg-primary text-white py-3 rounded-lg font-medium hover:bg-secondary disabled:bg-gray-300 disabled:cursor-not-allowed transition"
          >
            {currentQuestion < quiz.questions.length - 1 ? 'Next Question' : 'Finish Quiz'}
          </button>
        </div>
      </div>
    );
  }

  return null;
};

export default QuizModule;
