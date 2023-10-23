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
const roadRepository_1 = require("../database/roadRepository");
const road = (0, express_1.Router)();
//Get Branches
road.get('/branch', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield (0, roadRepository_1.getBranches)(req);
        return res.status(200).json(result);
    }
    catch (err) {
        return res.status(500);
    }
}));
//Create Branch
road.post('/branch', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield (0, roadRepository_1.createBranch)(req);
        return res.status(200).json(result);
    }
    catch (err) {
        return res.status(500);
    }
}));
//Update Branch
road.put('/branch', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield (0, roadRepository_1.updateBranch)(req);
        return res.status(200).json(result);
    }
    catch (err) {
        return res.status(500);
    }
}));
//Get routes
road.get('/route', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield (0, roadRepository_1.getRoutes)(req);
        return res.status(200).json(result);
    }
    catch (error) {
        return res.status(500);
    }
}));
//Create route
road.get('/route', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield (0, roadRepository_1.createRoute)(req);
        return res.status(200).json(result);
    }
    catch (error) {
        return res.status(500);
    }
}));
//Update route
road.get('/route', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield (0, roadRepository_1.updateRoute)(req);
        return res.status(200).json(result);
    }
    catch (error) {
        return res.status(500);
    }
}));
//Get path
road.get('/path', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield (0, roadRepository_1.getPaths)(req);
        return res.status(200).json(result);
    }
    catch (error) {
        return res.status(500);
    }
}));
//Create path
road.get('/path', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield (0, roadRepository_1.createPath)(req);
        return res.status(200).json(result);
    }
    catch (error) {
        return res.status(500);
    }
}));
//Update route
road.get('/path', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield (0, roadRepository_1.updatePath)(req);
        return res.status(200).json(result);
    }
    catch (error) {
        return res.status(500);
    }
}));
//Get cities
road.get('/city', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield (0, roadRepository_1.getCities)(req);
        return res.status(200).json(result);
    }
    catch (error) {
        return res.status(500);
    }
}));
//Get departments
road.get('/department', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield (0, roadRepository_1.getDepartments)(req);
        return res.status(200).json(result);
    }
    catch (error) {
        return res.status(500);
    }
}));
