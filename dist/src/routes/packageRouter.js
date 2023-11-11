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
exports.packageRouter = void 0;
const express_1 = require("express");
const orderRepository_1 = require("../database/orderRepository");
const database_1 = require("../models/database");
const crud_1 = require("../utils/crud");
exports.packageRouter = (0, express_1.Router)();
//Orders
exports.packageRouter.get('/:order', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = Number(req.params.order);
        const result = yield (0, orderRepository_1.getPackagesByOrder)(req, id);
        return res.status(200).json(yield (0, crud_1.GetResponsePaginated)(database_1.prisma.package, result));
    }
    catch (error) {
        return res.status(500).json(error);
    }
}));
exports.packageRouter.get('', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield (0, orderRepository_1.getPackages)(req);
        return res.status(200).json(yield (0, crud_1.GetResponsePaginated)(database_1.prisma.package, result));
    }
    catch (error) {
        return res.status(500).json(error);
    }
}));
//# sourceMappingURL=packageRouter.js.map