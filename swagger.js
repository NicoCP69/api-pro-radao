// swagger.js
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Radao API',
      version: '1.0.0',
      description: "API de tokenisation d'actifs Radao",
    },
    servers: [
      {
        url:
          process.env.NODE_ENV === 'production'
            ? 'https://votre-api.onrender.com' // URL de production
            : 'http://localhost:3000', // URL de développement
        description:
          process.env.NODE_ENV === 'production'
            ? 'Serveur de production'
            : 'Serveur de développement',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ['./routes/*.js', './models/*.js'],
};

const specs = swaggerJsdoc(options);

export const swaggerSetup = (app) => {
  // Options de configuration Swagger UI
  const swaggerUiOptions = {
    explorer: true,
    customCss: '.swagger-ui .topbar { display: none }',
    customSiteTitle: 'Radao API Documentation',
  };

  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs, swaggerUiOptions));
};
