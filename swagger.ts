import express from 'express';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
const swaggerDocument = YAML.load('./swagger.yaml');

const app = express();


// Define las opciones para swagger-jsdoc
const options = {
  definition: {
    openapi: '3.0.0', // Especifica la versión de OpenAPI
    info: {
      title: 'API de Ejemplo', // Nombre de tu API
      version: '1.0.0', // Versión de tu API
      description: 'Documentación de la API de ejemplo', // Descripción de tu API
    },
  },
  apis: ['./src/routes/*.ts'], // Patrón para buscar tus archivos de rutas en TypeScript
};

const swaggerSpec = swaggerJSDoc(options);

// Agrega la documentación de Swagger a tu aplicación
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
//app.use('/api-docs2', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

export default app;