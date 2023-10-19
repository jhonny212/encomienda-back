"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.endpoints = void 0;
const database_1 = require("../models/database");
const pagination_1 = require("../utils/pagination");
const crud_1 = require("../utils/crud");
/**
 * Exclude the creating of department and city
 */
/**
 * Get of models
 */
const getBranches = () => (pageSize, filters = {}) => {
    return database_1.prisma.branchOffice.findMany((0, pagination_1.paginator)(pageSize));
};
const getCities = () => (pageSize, filters = {}) => {
    return database_1.prisma.city.findMany((0, pagination_1.paginator)(pageSize));
};
const getDepartments = () => (pageSize, filters = {}) => {
    return database_1.prisma.department.findMany((0, pagination_1.paginator)(pageSize));
};
const getPaths = () => (pageSize, filters = {}) => {
    return database_1.prisma.path.findMany((0, pagination_1.paginator)(pageSize));
};
const getRoutes = () => (pageSize, filters = {}) => {
    return database_1.prisma.route.findMany((0, pagination_1.paginator)(pageSize));
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
const createPath = (req) => {
    const body = req.body;
    return database_1.prisma.path.create({
        data: Object.assign({}, body)
    });
};
const createRoute = (req) => {
    const body = req.body;
    return database_1.prisma.route.create({
        data: Object.assign({}, body)
    });
};
/**
 * update models
 */
const updateBranch = (req) => {
    const [pk, newdata] = (0, crud_1.updateCleaner)(req, "id");
    const data = newdata;
    return database_1.prisma.branchOffice.update({
        data,
        where: {
            id: pk
        }
    });
};
const updatePath = (req) => {
    const [pk, newdata] = (0, crud_1.updateCleaner)(req, "id");
    const data = newdata;
    return database_1.prisma.path.update({
        data,
        where: {
            id: pk
        }
    });
};
const updateRoute = (req) => {
    const [pk, newdata] = (0, crud_1.updateCleaner)(req, "id");
    const data = newdata;
    return database_1.prisma.route.update({
        data,
        where: {
            id: pk
        }
    });
};
exports.endpoints = {
    getBranches, getCities, getDepartments, getPaths, getRoutes,
    createBranch, createPath, createRoute,
    updateBranch, updatePath, updateRoute
};
