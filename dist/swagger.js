"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const yamljs_1 = __importDefault(require("yamljs"));
const swaggerDocument = yamljs_1.default.load('./swagger/swagger.yaml');
const app = (0, express_1.default)();
// Define las opciones para swagger-jsdoc
const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API de Ejemplo',
            version: '1.0.0',
            description: 'Documentación de la API de ejemplo', // Descripción de tu API
        },
    },
    apis: ['./src/routes/*.ts'], // Patrón para buscar tus archivos de rutas en TypeScript
};
const swaggerSpec = (0, swagger_jsdoc_1.default)(options);
// Agrega la documentación de Swagger a tu aplicación
app.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerDocument));
//app.use('/api-docs2', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
exports.default = app;
//# sourceMappingURL=swagger.js.map