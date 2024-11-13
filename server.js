// server.js
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { swaggerSetup } from './swagger.js';

// Import des routes
import authRoutes from './routes/auth.routes.js';
import tokenRoutes from './routes/token.routes.js';
import configurationRoutes from './routes/configuration.routes.js';
import hearingRoutes from './routes/hearing.routes.js';

// Configuration
dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Gestion des fichiers uploadés
app.use('/uploads', express.static('uploads'));

// Connexion à MongoDB
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log('Connecté à MongoDB'))
  .catch((err) => console.error('Erreur de connexion MongoDB:', err));

// Configuration Swagger
swaggerSetup(app);

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/tokens', tokenRoutes);
app.use('/api/configuration', configurationRoutes);
app.use('/api/hearing', hearingRoutes);

// Route de test/santé
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    message: 'API running',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
  });
});

// Gestion des routes non trouvées
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    error: 'Route non trouvée',
  });
});

// Gestion globale des erreurs
app.use((err, req, res, next) => {
  console.error('Erreur:', err.stack);

  const response = {
    success: false,
    error: process.env.NODE_ENV === 'development' ? err.message : 'Une erreur est survenue',
  };

  // Ajouter la stack trace en développement
  if (process.env.NODE_ENV === 'development') {
    response.stack = err.stack;
  }

  res.status(err.status || 500).json(response);
});

// Démarrage du serveur
const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
  console.log(`Documentation Swagger disponible sur: http://localhost:${PORT}/api-docs`);
  console.log(`Environnement: ${process.env.NODE_ENV || 'development'}`);
});

// Gestion gracieuse de l'arrêt
process.on('SIGTERM', () => {
  console.log('Signal SIGTERM reçu. Arrêt gracieux du serveur...');
  server.close(() => {
    console.log('Serveur arrêté');
    mongoose.connection.close(false, () => {
      console.log('Connexion MongoDB fermée');
      process.exit(0);
    });
  });
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
  // En production, vous voudrez peut-être gérer cela différemment
});

export default server;
