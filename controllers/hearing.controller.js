import Hearing from '../models/Hearing.js';
import fs from 'fs/promises';
import path from 'path';

// Fonction utilitaire de validation
const validators = {
  email: (value) => /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value),
  wallet: (value) => /^0x[a-fA-F0-9]{40}$/.test(value),
};

const processFile = async (file, type) => {
  const content = await fs.readFile(file.path, 'utf-8');
  const items = content.split(',').map((item) => item.trim());

  const validItems = items.filter((item) => validators[type](item));

  return {
    total: items.length,
    valid: validItems.length,
    items: validItems,
  };
};

export const uploadList = async (req, res) => {
  try {
    const { tokenId } = req.params;
    const { listType } = req.body; // 'email' ou 'wallet'
    const file = req.file;

    if (!['email', 'wallet'].includes(listType)) {
      return res.status(400).json({
        success: false,
        error: 'Type de liste invalide. Utilisez "email" ou "wallet"',
      });
    }

    const processedData = await processFile(file, listType);

    let hearingData = {
      token: tokenId,
      listType,
      status: 'pending',
    };

    if (listType === 'email') {
      hearingData.emailList = file.path;
      hearingData.emails = processedData.items.map((email) => ({
        email,
        status: 'pending',
      }));
    } else {
      hearingData.walletList = file.path;
      hearingData.wallets = processedData.items.map((address) => ({
        address,
        status: 'pending',
      }));
    }

    const hearing = new Hearing(hearingData);
    await hearing.save();

    res.json({
      success: true,
      data: {
        total: processedData.total,
        valid: processedData.valid,
        hearing,
      },
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

// Routes
export const getHearing = async (req, res) => {
  try {
    const { hearingId } = req.params;
    const hearing = await Hearing.findById(hearingId);

    if (!hearing) {
      return res.status(404).json({
        success: false,
        error: 'Liste non trouvée',
      });
    }

    res.json({
      success: true,
      data: hearing,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};
