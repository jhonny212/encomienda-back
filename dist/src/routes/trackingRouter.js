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
exports.trackingRouter = void 0;
const express_1 = require("express");
const trackingRepository_1 = require("../database/trackingRepository");
exports.trackingRouter = (0, express_1.Router)();
exports.trackingRouter.post('/bestRoute', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield (0, trackingRepository_1.getPath)(req);
        return res.status(200).json(result);
    }
    catch (err) {
        return res.status(500).json(err);
    }
}));
exports.trackingRouter.put('', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield (0, trackingRepository_1.moveOrder)(req);
        return res.status(200).json(result);
    }
    catch (error) {
        return res.status(500).json(error);
    }
}));
exports.trackingRouter.get('/qr/:orderId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield (0, trackingRepository_1.generateQRCode)(req);
        return res.status(200).json(result);
    }
    catch (error) {
        return res.status(500).json(error);
    }
}));
exports.trackingRouter.get('/tracking/qr/:orderId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield (0, trackingRepository_1.trackQr)(req);
        return res.status(200).json(result);
    }
    catch (error) {
        return res.status(500).json(error);
    }
}));
//# sourceMappingURL=trackingRouter.js.map