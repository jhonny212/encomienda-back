"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("../models/database");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const limit = Number(process.env.LIMIT);
const paginator = (pageSize, filters = {}) => {
    return Object.assign({ skip: pageSize, take: limit }, filters);
};
/**
 * Exclude the creating of department and city
 */
/**
 * Get of models
 */
const getBranches = () => (pageSize, filters = {}) => {
    return database_1.prisma.branchOffice.findMany(paginator(pageSize));
};
const getCities = () => (pageSize, filters = {}) => {
    return database_1.prisma.city.findMany(paginator(pageSize));
};
const getDepartments = () => (pageSize, filters = {}) => {
    return database_1.prisma.department.findMany(paginator(pageSize));
};
const getPaths = () => (pageSize, filters = {}) => {
    return database_1.prisma.path.findMany(paginator(pageSize));
};
const getRoutes = () => (pageSize, filters = {}) => {
    return database_1.prisma.route.findMany(paginator(pageSize));
};
/**
 * Create models
 */
const createBranch = (req) => {
    const body = req.body;
    return database_1.prisma.branchOffice.create({
        data: Object.assign({}, body)
    });
};
