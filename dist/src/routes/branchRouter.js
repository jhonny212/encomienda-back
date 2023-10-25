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
exports.branchRouter = (0, express_1.Router)();
//Get Branches
exports.branchRouter.get('', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield (0, roadRepository_1.getBranches)(req);
        return res.status(200).json(result);
    }
    catch (err) {
        return res.status(500);
    }
}));
//Create Branch
exports.branchRouter.post('', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield (0, roadRepository_1.createBranch)(req);
        return res.status(200).json(result);
    }
    catch (err) {
        return res.status(500);
    }
}));
//Update Branch
exports.branchRouter.put('', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield (0, roadRepository_1.updateBranch)(req);
        return res.status(200).json(result);
    }
    catch (err) {
        return res.status(500);
    }
}));
