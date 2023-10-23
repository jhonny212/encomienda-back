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
exports.updateRoute = exports.updatePath = exports.updateBranch = exports.createRoute = exports.createPath = exports.createBranch = exports.getRoutes = exports.getPaths = exports.getDepartments = exports.getCities = exports.getBranches = void 0;
const database_1 = require("../models/database");
const paginator_1 = require("../utils/paginator");
const crud_1 = require("../utils/crud");
/**
 * Exclude the creating of department and city
 */
/**
 * Get of models
 */
const getBranches = (pageSize) => __awaiter(void 0, void 0, void 0, function* () {
    return database_1.prisma.branchOffice.findMany((0, paginator_1.paginator)(pageSize));
});
exports.getBranches = getBranches;
const getCities = (pageSize, filters = {}) => __awaiter(void 0, void 0, void 0, function* () {
    return database_1.prisma.city.findMany((0, paginator_1.paginator)(pageSize, filters));
});
exports.getCities = getCities;
const getDepartments = (pageSize, filters = {}) => __awaiter(void 0, void 0, void 0, function* () {
    return database_1.prisma.department.findMany((0, paginator_1.paginator)(pageSize, filters));
});
exports.getDepartments = getDepartments;
const getPaths = (pageSize, filters = {}) => __awaiter(void 0, void 0, void 0, function* () {
    return database_1.prisma.path.findMany((0, paginator_1.paginator)(pageSize, filters));
});
exports.getPaths = getPaths;
const getRoutes = (pageSize, filters = {}) => __awaiter(void 0, void 0, void 0, function* () {
    return database_1.prisma.route.findMany((0, paginator_1.paginator)(pageSize, filters));
});
exports.getRoutes = getRoutes;
/**
 * Create models
 */
const createBranch = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    return database_1.prisma.branchOffice.create({
        data: Object.assign({}, body)
    });
});
exports.createBranch = createBranch;
const createPath = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    return database_1.prisma.path.create({
        data: Object.assign({}, body)
    });
});
exports.createPath = createPath;
const createRoute = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    return database_1.prisma.route.create({
        data: Object.assign({}, body)
    });
});
exports.createRoute = createRoute;
/**
 * update models
 */
const updateBranch = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const [pk, newdata] = (0, crud_1.updateCleaner)(req, "id");
    const data = newdata;
    return database_1.prisma.branchOffice.update({
        data,
        where: {
            id: pk
        }
    });
});
exports.updateBranch = updateBranch;
const updatePath = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const [pk, newdata] = (0, crud_1.updateCleaner)(req, "id");
    const data = newdata;
    return database_1.prisma.path.update({
        data,
        where: {
            id: pk
        }
    });
});
exports.updatePath = updatePath;
const updateRoute = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const [pk, newdata] = (0, crud_1.updateCleaner)(req, "id");
    const data = newdata;
    return database_1.prisma.route.update({
        data,
        where: {
            id: pk
        }
    });
});
exports.updateRoute = updateRoute;
