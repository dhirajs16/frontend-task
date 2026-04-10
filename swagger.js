const swaggerJsdoc = require('swagger-jsdoc');
const path = require('path');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Task Backend API',
      version: '1.0.0',
    },
    servers: [
      {
        url: 'http://localhost:5000',
      },
    ],
  },
  apis: [path.join(__dirname, './routes/*.js')],
};

module.exports = swaggerJsdoc(options);