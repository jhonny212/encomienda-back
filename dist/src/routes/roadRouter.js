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
exports.roadRouter = void 0;
const express_1 = require("express");
const roadRepository_1 = require("../database/roadRepository");
const crud_1 = require("../utils/crud");
const database_1 = require("../models/database");
exports.roadRouter = (0, express_1.Router)();
//Get routes
exports.roadRouter.get('', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield (0, roadRepository_1.getRoutes)(req);
        return res.status(200).json(yield (0, crud_1.GetResponsePaginated)(database_1.prisma.route, result));
    }
    catch (error) {
        return res.status(500).json(error);
    }
}));
//Create route
exports.roadRouter.post('', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield (0, roadRepository_1.createRoute)(req);
        return res.status(200).json(result);
    }
    catch (error) {
        return res.status(500).json(error);
    }
}));
//Update route
exports.roadRouter.put('', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield (0, roadRepository_1.updateRoute)(req);
        return res.status(200).json(result);
    }
    catch (error) {
        return res.status(500).json(error);
    }
}));
exports.roadRouter.delete('', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield (0, roadRepository_1.deleteRoute)(req, res);
        return res.status(200).json(result);
    }
    catch (err) {
        return res.status(500).json(err);
    }
}));
//Get cities
exports.roadRouter.get('/city', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield (0, roadRepository_1.getCities)(req);
        return res.status(200).json(yield (0, crud_1.GetResponsePaginated)(database_1.prisma.city, result));
    }
    catch (error) {
        return res.status(500).json(error);
    }
}));
exports.roadRouter.delete('/city', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield (0, roadRepository_1.deleteCity)(req, res);
        return res.status(200).json(result);
    }
    catch (err) {
        return res.status(500).json(err);
    }
}));
//Get departments
exports.roadRouter.get('/department', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield (0, roadRepository_1.getDepartments)(req);
        return res.status(200).json(yield (0, crud_1.GetResponsePaginated)(database_1.prisma.department, result));
    }
    catch (error) {
        return res.status(500).json(error);
    }
}));
exports.roadRouter.delete('/department', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield (0, roadRepository_1.deleteDepartment)(req, res);
        return res.status(200).json(result);
    }
    catch (err) {
        return res.status(500).json(err);
    }
}));
//# sourceMappingURL=roadRouter.js.map