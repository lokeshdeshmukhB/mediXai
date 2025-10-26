import express from 'express';
import { generateQuiz, submitQuiz, getQuizHistory, getLeaderboard } from '../controllers/quiz.controller.js';
import { protect } from '../middleware/auth.middleware.js';

const router = express.Router();

router.use(protect);

router.post('/generate', generateQuiz);
router.post('/submit', submitQuiz);
router.get('/history', getQuizHistory);
router.get('/leaderboard', getLeaderboard);

export default router;
