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
exports.branchRouter = void 0;
const express_1 = require("express");
const roadRepository_1 = require("../database/roadRepository");
const crud_1 = require("../utils/crud");
const database_1 = require("../models/database");
const gain_1 = require("../scripts/metrics/gain");
exports.branchRouter = (0, express_1.Router)();
//Get Branches
exports.branchRouter.get('', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield (0, roadRepository_1.getBranches)(req);
        return res.status(200).json(yield (0, crud_1.GetResponsePaginated)(database_1.prisma.branchOffice, result));
    }
    catch (err) {
        return res.status(500).json(err);
    }
}));
//Delete Branch
exports.branchRouter.delete('', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield (0, roadRepository_1.deleteBranch)(req, res);
        return res.status(200).json(result);
    }
    catch (err) {
        return res.status(500).json(err);
    }
}));
//Create Branch
exports.branchRouter.post('', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield (0, roadRepository_1.createBranch)(req);
        return res.status(200).json(result);
    }
    catch (err) {
        return res.status(500).json(err);
    }
}));
//Update Branch
exports.branchRouter.put('', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield (0, roadRepository_1.updateBranch)(req);
        console.log(result);
        return res.status(200).json(result);
    }
    catch (err) {
        return res.status(500).json(err);
    }
}));
exports.branchRouter.get('/:metric', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield (0, gain_1.gainMetric)();
        return res.status(200).json(result);
    }
    catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
}));
//# sourceMappingURL=branchRouter.js.map