import * as dotenv from 'dotenv';

import swaggerJSDoc from 'swagger-jsdoc';

dotenv.config();

export const swaggerDefinition = swaggerJSDoc({
  swaggerDefinition: {
    openapi: '3.0.3',
    info: {
      title: 'Be dự án tốt nghiệp',
      version: '1.0.0',
      description: 'API cho dự án tốt nghiệp',
    },
    servers: [
      {
        url: `http://localhost:${process.env.PORT || 8000}/api`,
        description: 'Development API',
      },
    ],
  },
  apis: ['src/docs/**/*.yaml'],
});
