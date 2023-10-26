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
exports.jobRouter = void 0;
const express_1 = require("express");
const jobRepository_1 = require("../database/jobRepository");
const database_1 = require("../models/database");
const crud_1 = require("../utils/crud");
exports.jobRouter = (0, express_1.Router)();
exports.jobRouter.post('', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield (0, jobRepository_1.createJob)(req, res);
        return res.status(200).json(result);
    }
    catch (error) {
        return res.status(500);
    }
}));
exports.jobRouter.get('', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield (0, jobRepository_1.getAllJobs)(req, res);
        return res.status(200).json(yield (0, crud_1.GetResponsePaginated)(database_1.prisma.job, result));
    }
    catch (error) {
        return res.status(500);
    }
}));
