import express from 'express';
import { auth } from '../middleware/auth.js';
import multer from 'multer';
import { configureReserve, addAssetRequest } from '../controllers/reserve.controller.js';
import { configureIssuer } from '../controllers/issuer.controller.js';
import { configureDistributor } from '../controllers/distributor.controller.js';
import { uploadEmailList } from '../controllers/hearing.controller.js';

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

// Reserve routes
router.post('/tokens/:tokenId/reserve', auth, configureReserve);
router.post('/tokens/:tokenId/reserve/request', auth, addAssetRequest);

// Issuer routes
router.post('/tokens/:tokenId/issuer', auth, configureIssuer);
router.put('/tokens/:tokenId/issuer/lock', auth, lockIssuer);

// Distributor routes
router.post('/tokens/:tokenId/distributor', auth, configureDistributor);
router.put('/tokens/:tokenId/distributor/lock', auth, lockDistributor);

// Hearing routes
router.post('/tokens/:tokenId/hearing/upload', auth, upload.single('emailList'), uploadEmailList);

export default router;
