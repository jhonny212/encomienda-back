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
exports.vehicleRouter = void 0;
const express_1 = require("express");
const vehicleRepository_1 = require("../database/vehicleRepository");
const database_1 = require("../models/database");
const crud_1 = require("../utils/crud");
exports.vehicleRouter = (0, express_1.Router)();
exports.vehicleRouter.delete('', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield (0, vehicleRepository_1.deleteVehicle)(req, res);
        return res.status(200).json(result);
    }
    catch (err) {
        return res.status(500).json(err);
    }
}));
exports.vehicleRouter.get('', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield (0, vehicleRepository_1.getVehicles)(req);
        return res.status(200).json(yield (0, crud_1.GetResponsePaginated)(database_1.prisma.vehicle, result));
    }
    catch (error) {
        return res.status(500).json(error);
    }
}));
exports.vehicleRouter.post('', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield (0, vehicleRepository_1.createVehicle)(req);
        return res.status(200).json(result);
    }
    catch (error) {
        return res.status(500).json(error);
    }
}));
exports.vehicleRouter.put('', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield (0, vehicleRepository_1.updateVehicle)(req);
        return res.status(200).json(result);
    }
    catch (error) {
        return res.status(500).json(error);
    }
}));
exports.vehicleRouter.get('/type', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield (0, vehicleRepository_1.getVehicleTypes)(req);
        return res.status(200).json(yield (0, crud_1.GetResponsePaginated)(database_1.prisma.vehicleType, result));
    }
    catch (error) {
        return res.status(500).json(error);
    }
}));
exports.vehicleRouter.post('/type', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield (0, vehicleRepository_1.createVehicleType)(req);
        return res.status(200).json(result);
    }
    catch (error) {
        return res.status(500).json(error);
    }
}));
exports.vehicleRouter.put('/type', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield (0, vehicleRepository_1.updateVehicleType)(req);
        return res.status(200).json(result);
    }
    catch (error) {
        return res.status(500).json(error);
    }
}));
exports.vehicleRouter.delete('/type', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield (0, vehicleRepository_1.deleteVehicle)(req, res);
        return res.status(200).json(result);
    }
    catch (err) {
        return res.status(500).json(err);
    }
}));
//# sourceMappingURL=vehicleRouter.js.map