import mongoose from 'mongoose';
import { SpvProvider } from '../models/Configuration.js';
import dotenv from 'dotenv';

dotenv.config();

const spvProvidersData = [
  {
    name: 'chainr-ou',
    displayName: 'ChainR OÜ',
    description: "Services d'émission de tokens basés en Estonie",
    website: 'https://chainr.eu',
    contactEmail: 'contact@chainr.eu',
    order: 1,
  },
  {
    name: 'chainr-sas',
    displayName: 'ChainR SAS',
    description: "Services d'émission de tokens basés en France",
    website: 'https://chainr.fr',
    contactEmail: 'contact@chainr.fr',
    order: 2,
  },
  {
    name: 'chainr-uab',
    displayName: 'ChainR UAB',
    description: "Services d'émission de tokens basés en Lituanie",
    website: 'https://chainr.lt',
    contactEmail: 'contact@chainr.lt',
    order: 3,
  },
];

const seedSpvProviders = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    await SpvProvider.deleteMany({});
    await SpvProvider.insertMany(spvProvidersData);
    console.log('Seed des fournisseurs SPV réussi');
    process.exit(0);
  } catch (error) {
    console.error('Erreur lors du seed des fournisseurs SPV:', error);
    process.exit(1);
  }
};
