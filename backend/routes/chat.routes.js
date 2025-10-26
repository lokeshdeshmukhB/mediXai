import express from 'express';
import { sendMessage, getChats, getChat, deleteChat } from '../controllers/chat.controller.js';
import { protect } from '../middleware/auth.middleware.js';

const router = express.Router();

router.use(protect);

router.post('/message', sendMessage);
router.get('/', getChats);
router.get('/:id', getChat);
router.delete('/:id', deleteChat);

export default router;
