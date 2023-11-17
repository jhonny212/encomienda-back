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
exports.orderRouter = void 0;
const express_1 = require("express");
const orderRepository_1 = require("../database/orderRepository");
const database_1 = require("../models/database");
const crud_1 = require("../utils/crud");
exports.orderRouter = (0, express_1.Router)();
//Orders
exports.orderRouter.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = Number(req.params.id);
        const result = yield (0, orderRepository_1.getOrderById)(req, id);
        return res.status(200).json(result);
    }
    catch (error) {
        return res.status(500).json(error);
    }
}));
exports.orderRouter.get('', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield (0, orderRepository_1.getOrders)(req);
        return res.status(200).json(yield (0, crud_1.GetResponsePaginated)(database_1.prisma.order, result));
    }
    catch (error) {
        return res.status(500).json(error);
    }
}));
exports.orderRouter.post('', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield (0, orderRepository_1.crearOrder)(req);
        return res.status(200).json(result);
    }
    catch (error) {
        return res.status(500).json(error);
    }
}));
exports.orderRouter.post('/estimate', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield (0, orderRepository_1.estimateOrderCost)(req.body.route, req.body.packages);
        return res.status(200).json(result);
    }
    catch (error) {
        return res.status(500).json(error);
    }
}));
exports.orderRouter.delete('', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield (0, orderRepository_1.deleteOrder)(req, res);
        return res.status(200).json(result);
    }
    catch (err) {
        return res.status(500).json(err);
    }
}));
//# sourceMappingURL=orderRouter.js.map