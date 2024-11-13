import express from 'express';
import { auth } from '../middleware/auth.js';
import {
  getSpvProviders,
  addSpvProvider,
  updateSpvProvider,
  toggleSpvProviderStatus,
  getThemes,
  addTheme,
  getFonts,
  addFont,
} from '../controllers/configuration.controller.js';

const router = express.Router();

router.get('/spv-providers', getSpvProviders);
router.post('/spv-providers', auth, isAdmin, addSpvProvider);
router.put('/spv-providers/:id', auth, isAdmin, updateSpvProvider);
router.patch('/spv-providers/:id/toggle', auth, isAdmin, toggleSpvProviderStatus);

router.get('/themes', getThemes);
router.post('/themes', auth, addTheme);

router.get('/fonts', getFonts);
router.post('/fonts', auth, addFont);

export default router;
