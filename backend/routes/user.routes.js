import express from 'express';
import multer from 'multer';
import { getProfile, updateProfile, getUserStats, uploadAvatar, getUserActivity } from '../controllers/user.controller.js';
import { protect } from '../middleware/auth.middleware.js';

const router = express.Router();

const upload = multer({ dest: 'uploads/' });

router.use(protect);

router.get('/profile', getProfile);
router.put('/profile', updateProfile);
router.get('/stats', getUserStats);
router.post('/avatar', upload.single('avatar'), uploadAvatar);
router.get('/activity', getUserActivity);

export default router;
