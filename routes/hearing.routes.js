import express from 'express';
import multer from 'multer';
import { uploadList, getHearing } from '../controllers/hearing.controller.js';
import { auth } from '../middleware/auth.js';

const router = express.Router();

// Configuration Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + '-' + uniqueSuffix + '.txt');
  },
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype !== 'text/plain') {
      return cb(new Error('Seuls les fichiers .txt sont acceptés'));
    }
    cb(null, true);
  },
});

router.post('/tokens/:tokenId/hearing/upload', auth, upload.single('file'), uploadList);

router.get('/hearing/:hearingId', auth, getHearing);

export default router;
