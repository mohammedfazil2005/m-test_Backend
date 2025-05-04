const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'AI-Enhanced Real-Time Dashboard API',
      version: '1.0.0',
      description: 'REST API for user authentication, sensor simulation, and flowchart management'
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Local server'
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      }
    },
    security: [
      {
        bearerAuth: []
      }
    ]
  },
  apis: ['./routes/flowRoute.js', './routes/userRoute.js'], // add .js if missing
};

const swaggerSpec = swaggerJsdoc(options);
module.exports = swaggerSpec;
