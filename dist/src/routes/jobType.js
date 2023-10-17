"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const jobRepository_1 = require("../database/jobRepository");
const routerJob = (0, express_1.Router)();
/**
 * @swagger
 * /api/job/:
 *   get:
 *     summary: Obtiene la lista de los trabajos
 *     description: Obtiene una lista de trabajos registrados.
 *     responses:
 *       200:
 *         description: Lista de trabajos
 *         content:
 *           application/json:
 *             example: [{ id: 1, name: 'Usuario 1' }, { id: 2, name: 'Usuario 2' }]
 */
routerJob.get('/', jobRepository_1.endpoints.test);
/**
 * @swagger
 * /api/job/:
 *   get:
 *     summary: Obtiene la lista de los trabajos
 *     description: Obtiene una lista de trabajos registrados.
 *     responses:
 *       200:
 *         description: Lista de trabajos
 *         content:
 *           application/json:
 *             example: [{ id: 1, name: 'Usuario 1' }, { id: 2, name: 'Usuario 2' }]
 */
routerJob.post('/test', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield jobRepository_1.endpoints.createJobType(req, res);
        return res.status(200).json(result);
    }
    catch (error) {
        return res.status(500);
    }
}));
exports.default = routerJob;
