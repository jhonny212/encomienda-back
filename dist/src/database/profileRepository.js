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
exports.updateUser = exports.createUser = exports.getUsers = exports.updateEmployee = exports.createEmployee = exports.getEmployees = void 0;
const database_1 = require("../models/database");
const paginator_1 = require("../utils/paginator");
const crud_1 = require("../utils/crud");
//Employee CRUD
const getEmployees = (req) => __awaiter(void 0, void 0, void 0, function* () {
    return database_1.prisma.employee.findMany(Object.assign(Object.assign({}, (0, paginator_1.paginator)(req)), { include: {
            job: true,
            branchOffice: true
        } }));
});
exports.getEmployees = getEmployees;
const createEmployee = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    return database_1.prisma.employee.create({
        data
    });
});
exports.createEmployee = createEmployee;
const updateEmployee = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const [pk, newdata] = (0, crud_1.updateCleaner)(req, "id");
    const data = newdata;
    return database_1.prisma.employee.update({
        data,
        where: {
            id: pk
        }
    });
});
exports.updateEmployee = updateEmployee;
//User CRUD
const getUsers = (req) => __awaiter(void 0, void 0, void 0, function* () {
    return database_1.prisma.user.findMany(Object.assign(Object.assign({}, (0, paginator_1.paginator)(req)), { include: {
            employee: true
        } }));
});
exports.getUsers = getUsers;
const createUser = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    return database_1.prisma.user.create({
        data
    });
});
exports.createUser = createUser;
const updateUser = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const [pk, newdata] = (0, crud_1.updateCleaner)(req, "id");
    const data = newdata;
    return database_1.prisma.user.update({
        data,
        where: {
            id: pk
        }
    });
});
exports.updateUser = updateUser;
