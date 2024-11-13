# Radao API

## Description

API backend pour l'application Radao permettant la création et la gestion de tokens, avec des fonctionnalités de configuration de réserve, d'émission et de distribution.

## Technologies

- Node.js
- Express
- MongoDB
- JWT pour l'authentification

## Installation

1. Cloner le repository

```bash
git clone https://github.com/votre-username/radao-api.git
```

2. Installer les dépendances

```bash
cd radao-api
npm install
```

3. Créer un fichier .env à la racine du projet

```env
PORT=3000
MONGODB_URI=votre_uri_mongodb
JWT_SECRET=votre_secret_jwt
```

4. Lancer le serveur

```bash
npm run dev
```

## Structure du Projet

```
src/
├── config/
│   └── database.js
├── controllers/
│   ├── auth.controller.js
│   ├── token.controller.js
│   ├── reserve.controller.js
│   ├── issuer.controller.js
│   ├── distributor.controller.js
│   └── hearing.controller.js
├── middleware/
│   └── auth.js
├── models/
│   ├── User.js
│   ├── Token.js
│   ├── Reserve.js
│   ├── Issuer.js
│   ├── Distributor.js
│   └── Hearing.js
├── routes/
│   ├── auth.routes.js
│   ├── token.routes.js
│   └── content.routes.js
├── utils/
│   └── passwordValidator.js
├── app.js
└── server.js
```

## API Endpoints

### Authentication

- POST /api/auth/register - Inscription
- POST /api/auth/login - Connexion

### Tokens

- POST /api/tokens - Créer un token
- GET /api/tokens - Liste des tokens
- PUT /api/tokens/:id - Modifier un token

### Reserve

- POST /api/tokens/:tokenId/reserve - Configurer la réserve
- POST /api/tokens/:tokenId/reserve/request - Demande d'ajout d'actif

### Issuer

- POST /api/tokens/:tokenId/issuer - Configurer l'émetteur
- PUT /api/tokens/:tokenId/issuer/lock - Verrouiller la configuration

### Distributor

- POST /api/tokens/:tokenId/distributor - Configurer le distributeur
- PUT /api/tokens/:tokenId/distributor/lock - Verrouiller la configuration

### Hearing

- POST /api/tokens/:tokenId/hearing/upload - Upload liste d'emails

// package.json
{
"name": "radao-api",
"version": "1.0.0",
"description": "API backend pour l'application Radao",
"main": "src/server.js",
"type": "module",
"scripts": {
"start": "node src/server.js",
"dev": "nodemon src/server.js",
"test": "jest"
},
"dependencies": {
"bcryptjs": "^2.4.3",
"cors": "^2.8.5",
"dotenv": "^16.0.3",
"express": "^4.18.2",
"jsonwebtoken": "^9.0.0",
"mongoose": "^7.0.3",
"multer": "^1.4.5-lts.1"
},
"devDependencies": {
"jest": "^29.5.0",
"nodemon": "^2.0.22"
}
}
