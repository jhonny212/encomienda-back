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
exports.costRouter = void 0;
const express_1 = require("express");
const costRepository_1 = require("../database/costRepository");
const database_1 = require("../models/database");
const crud_1 = require("../utils/crud");
exports.costRouter = (0, express_1.Router)();
exports.costRouter.get('', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield (0, costRepository_1.getAlllCost)(req);
        return res.status(200).json(yield (0, crud_1.GetResponsePaginated)(database_1.prisma.cost, result));
    }
    catch (error) {
        return res.status(500);
    }
}));
exports.costRouter.post('', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield (0, costRepository_1.createCost)(req);
        return res.status(200).json(result);
    }
    catch (error) {
        return res.status(500);
    }
}));
exports.costRouter.get('/type', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield (0, costRepository_1.getAlllCostType)(req);
        return res.status(200).json(yield (0, crud_1.GetResponsePaginated)(database_1.prisma.costType, result));
    }
    catch (error) {
        return res.status(500);
    }
}));
exports.costRouter.post('/type', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield (0, costRepository_1.createCostType)(req);
        return res.status(200).json(result);
    }
    catch (error) {
    }
}));
