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
exports.profileRouter = void 0;
const express_1 = require("express");
const profileRepository_1 = require("../database/profileRepository");
const database_1 = require("../models/database");
const crud_1 = require("../utils/crud");
exports.profileRouter = (0, express_1.Router)();
exports.profileRouter.get('/user', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield (0, profileRepository_1.getUsers)(req);
        return res.status(200).json(yield (0, crud_1.GetResponsePaginated)(database_1.prisma.user, result));
    }
    catch (error) {
        return res.status(500).json(error);
    }
}));
exports.profileRouter.get('/employee', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield (0, profileRepository_1.getEmployees)(req);
        return res.status(200).json(yield (0, crud_1.GetResponsePaginated)(database_1.prisma.employee, result));
    }
    catch (error) {
        return res.status(500).json(error);
    }
}));
exports.profileRouter.post('/user', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield (0, profileRepository_1.createUser)(req);
        return res.status(200).json(result);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
}));
exports.profileRouter.post('/employee', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield (0, profileRepository_1.createEmployee)(req);
        return res.status(200).json(result);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
}));
exports.profileRouter.delete('/employee', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield (0, profileRepository_1.deleteEmployee)(req, res);
        return res.status(200).json(result);
    }
    catch (err) {
        return res.status(500).json(err);
    }
}));
exports.profileRouter.put('/user', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield (0, profileRepository_1.updateUser)(req);
        return res.status(200).json(result);
    }
    catch (error) {
        return res.status(500).json(error);
    }
}));
exports.profileRouter.put('/employee', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield (0, profileRepository_1.updateEmployee)(req);
        return res.status(200).json(result);
    }
    catch (error) {
        return res.status(500).json(error);
    }
}));
exports.profileRouter.post('/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield (0, profileRepository_1.login)(req);
        return res.status(200).json(result);
    }
    catch (error) {
        return res.status(500).json(error);
    }
}));
//# sourceMappingURL=profileRouter.js.map