import Hearing from '../models/Hearing.js';
import fs from 'fs/promises';
import path from 'path';

export const uploadEmailList = async (req, res) => {
  try {
    const { tokenId } = req.params;
    const file = req.file; // Utilisez multer pour gérer l'upload de fichier

    // Lire et valider le fichier
    const content = await fs.readFile(file.path, 'utf-8');
    const emails = content.split(',').map((email) => email.trim());

    // Valider les emails
    const validEmails = emails.filter((email) => /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email));

    const hearing = new Hearing({
      token: tokenId,
      emailList: file.path,
      emails: validEmails.map((email) => ({ email })),
    });

    await hearing.save();

    res.json({
      success: true,
      data: {
        totalEmails: emails.length,
        validEmails: validEmails.length,
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
