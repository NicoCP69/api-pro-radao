import express from 'express';
import { auth } from '../middleware/auth.js';
import {
  getSpvProviders,
  addSpvProvider,
  getThemes,
  addTheme,
  getFonts,
  addFont,
} from '../controllers/configuration.controller.js';

const router = express.Router();

router.get('/spv-providers', getSpvProviders);
router.post('/spv-providers', auth, addSpvProvider);

router.get('/themes', getThemes);
router.post('/themes', auth, addTheme);

router.get('/fonts', getFonts);
router.post('/fonts', auth, addFont);

export default router;
