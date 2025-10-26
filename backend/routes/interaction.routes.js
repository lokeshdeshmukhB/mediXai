import express from 'express';
import { checkInteractions, getDrugInfo } from '../controllers/interaction.controller.js';
import { protect } from '../middleware/auth.middleware.js';

const router = express.Router();

router.use(protect);

router.post('/check', checkInteractions);
router.get('/drug/:name', getDrugInfo);

export default router;
