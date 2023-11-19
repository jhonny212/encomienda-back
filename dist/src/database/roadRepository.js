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
exports.getOrdersByBranch = exports.updateRoute = exports.updateBranch = exports.deleteRoute = exports.createRoute = exports.deleteBranch = exports.createBranch = exports.getRoutes = exports.deleteDepartment = exports.getDepartments = exports.deleteCity = exports.getCities = exports.getBranches = void 0;
const database_1 = require("../models/database");
const paginator_1 = require("../utils/paginator");
const crud_1 = require("../utils/crud");
/**
 * Exclude the creating of department and city
 */
/**
 * Get of models
 */
const getBranches = (req) => __awaiter(void 0, void 0, void 0, function* () {
    return database_1.prisma.branchOffice.findMany(Object.assign(Object.assign({}, (0, paginator_1.paginator)(req)), { where: {
            isActive: true
        }, include: {
            city: true,
        } }));
});
exports.getBranches = getBranches;
const getCities = (req) => __awaiter(void 0, void 0, void 0, function* () {
    return database_1.prisma.city.findMany(Object.assign(Object.assign({}, (0, paginator_1.paginator)(req)), { where: {
            isActive: true
        }, include: {
            department: true
        } }));
});
exports.getCities = getCities;
const deleteCity = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.body;
    return (0, crud_1.removeEntity)(database_1.prisma.city, id);
});
exports.deleteCity = deleteCity;
const getDepartments = (req) => __awaiter(void 0, void 0, void 0, function* () {
    return database_1.prisma.department.findMany(Object.assign(Object.assign({}, (0, paginator_1.paginator)(req)), { where: {
            isActive: true,
        } }));
});
exports.getDepartments = getDepartments;
const deleteDepartment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.body;
    return (0, crud_1.removeEntity)(database_1.prisma.department, id);
});
exports.deleteDepartment = deleteDepartment;
const getRoutes = (req, filters = {}) => __awaiter(void 0, void 0, void 0, function* () {
    return database_1.prisma.route.findMany(Object.assign(Object.assign({}, (0, paginator_1.paginator)(req)), { where: Object.assign(Object.assign({}, filters), { isActive: true }), include: {
            origin: true,
            destination: true
        } }));
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
const deleteBranch = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.body;
    return (0, crud_1.removeEntity)(database_1.prisma.branchOffice, id);
});
exports.deleteBranch = deleteBranch;
const createRoute = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    return database_1.prisma.route.create({
        data: Object.assign({}, body)
    });
});
exports.createRoute = createRoute;
const deleteRoute = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.body;
    return (0, crud_1.removeEntity)(database_1.prisma.route, id);
});
exports.deleteRoute = deleteRoute;
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
const getOrdersByBranch = (req) => __awaiter(void 0, void 0, void 0, function* () {
    return database_1.prisma.order.findMany({
        where: {
            brachOfficeId: Number(req.params.brach)
        }
    });
});
exports.getOrdersByBranch = getOrdersByBranch;
//# sourceMappingURL=roadRepository.js.map