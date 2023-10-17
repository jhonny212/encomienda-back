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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.endpoints = void 0;
const database_1 = require("../models/database");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const limit = Number(process.env.LIMIT);
const getAllJobs = (req, res, pageSize = 0) => __awaiter(void 0, void 0, void 0, function* () {
    return database_1.prisma.job.findMany({
        skip: pageSize,
        take: limit
    });
});
//Creates
const createJob = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    return database_1.prisma.job.create({
        data: Object.assign({}, body)
    });
});
exports.endpoints = {
    createJob,
    getAllJobs
};
