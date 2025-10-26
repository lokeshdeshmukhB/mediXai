import express from 'express';
import multer from 'multer';
import { uploadAndSummarize, getSavedPapers, getPaper, deletePaper } from '../controllers/summarizer.controller.js';
import { protect } from '../middleware/auth.middleware.js';

const router = express.Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
  fileFilter: function (req, file, cb) {
    if (file.mimetype === 'application/pdf') {
      cb(null, true);
    } else {
      cb(new Error('Only PDF files are allowed'));
    }
  }
});

router.use(protect);

router.post('/upload', upload.single('file'), uploadAndSummarize);
router.get('/papers', getSavedPapers);
router.get('/papers/:id', getPaper);
router.delete('/papers/:id', deletePaper);

export default router;
