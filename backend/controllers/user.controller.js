import User from '../models/User.model.js';
import { QuizResult } from '../models/Quiz.model.js';
import cloudinary from '../config/cloudinary.js';

// @desc    Get user profile
// @route   GET /api/user/profile
// @access  Private
export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password');
    
    res.status(200).json({
      status: 'success',
      data: user
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
};

// @desc    Update user profile
// @route   PUT /api/user/profile
// @access  Private
export const updateProfile = async (req, res) => {
  try {
    const { name, university, role } = req.body;
    
    const user = await User.findById(req.user._id);
    
    if (name) user.name = name;
    if (university) user.university = university;
    if (role) user.role = role;
    
    await user.save();
    
    res.status(200).json({
      status: 'success',
      data: user
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
};

// @desc    Get user statistics
// @route   GET /api/user/stats
// @access  Private
export const getUserStats = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    
    // Get recent quiz results
    const recentQuizzes = await QuizResult.find({ user: req.user._id })
      .sort({ createdAt: -1 })
      .limit(5)
      .populate('quiz', 'category difficulty');
    
    // Calculate average score
    const allResults = await QuizResult.find({ user: req.user._id });
    const avgScore = allResults.length > 0
      ? allResults.reduce((sum, result) => sum + result.score, 0) / allResults.length
      : 0;
    
    res.status(200).json({
      status: 'success',
      data: {
        stats: user.stats,
        recentQuizzes,
        averageScore: Math.round(avgScore),
        totalQuizzes: allResults.length
      }
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
};

// @desc    Upload avatar
// @route   POST /api/user/avatar
// @access  Private
export const uploadAvatar = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        status: 'error',
        message: 'Please upload an image'
      });
    }

    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: 'pharmacacademy/avatars',
      width: 200,
      height: 200,
      crop: 'fill'
    });

    const user = await User.findById(req.user._id);
    user.avatar = result.secure_url;
    await user.save();

    res.status(200).json({
      status: 'success',
      data: {
        avatar: result.secure_url
      }
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
};

// @desc    Get user activity
// @route   GET /api/user/activity
// @access  Private
export const getUserActivity = async (req, res) => {
  try {
    const recentQuizzes = await QuizResult.find({ user: req.user._id })
      .sort({ createdAt: -1 })
      .limit(10)
      .select('category score createdAt');

    const activity = recentQuizzes.map(quiz => ({
      type: 'quiz',
      title: `Completed ${quiz.category} Quiz`,
      score: quiz.score,
      time: quiz.createdAt
    }));

    res.status(200).json({
      status: 'success',
      data: activity
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
};
