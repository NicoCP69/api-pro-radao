// src/scripts/seed.js
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { SpvProvider, Theme, Font } from '../models/Configuration.js';

dotenv.config();

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    // SPV Providers
    const spvProviders = [
      { name: 'ibex', displayName: 'IBExWallet', order: 1 },
      { name: 'radao', displayName: 'Radao', order: 2 },
      { name: 'shares', displayName: 'Shares', order: 3 },
    ];

    // Themes
    const themes = [
      { name: 'red', displayName: 'Rouge', colorCode: '#EF4444', order: 1 },
      { name: 'green', displayName: 'Vert', colorCode: '#10B981', order: 2 },
      { name: 'black', displayName: 'Noir', colorCode: '#000000', order: 3 },
      { name: 'blue', displayName: 'Bleu', colorCode: '#3B82F6', order: 4 },
      { name: 'gray', displayName: 'Gris', colorCode: '#6B7280', order: 5 },
    ];

    // Fonts
    const fonts = [
      { name: 'Inter', displayName: 'Inter', fallback: 'sans-serif', order: 1 },
      { name: 'Roboto', displayName: 'Roboto', fallback: 'sans-serif', order: 2 },
      { name: 'Poppins', displayName: 'Poppins', fallback: 'sans-serif', order: 3 },
      { name: 'Arial', displayName: 'Arial', fallback: 'sans-serif', order: 4 },
      { name: 'Helvetica', displayName: 'Helvetica', fallback: 'sans-serif', order: 5 },
    ];

    await SpvProvider.deleteMany({});
    await Theme.deleteMany({});
    await Font.deleteMany({});

    await SpvProvider.insertMany(spvProviders);
    await Theme.insertMany(themes);
    await Font.insertMany(fonts);

    console.log('Seed completed successfully');
    process.exit(0);
  } catch (error) {
    console.error('Seed failed:', error);
    process.exit(1);
  }
};

seedData();
