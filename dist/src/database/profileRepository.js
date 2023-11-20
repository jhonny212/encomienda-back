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
exports.login = exports.updateUser = exports.createUser = exports.getUsers = exports.deleteEmployee = exports.updateEmployee = exports.createEmployee = exports.getEmployees = void 0;
const database_1 = require("../models/database");
const paginator_1 = require("../utils/paginator");
const crud_1 = require("../utils/crud");
const jobRepository_1 = require("../database/jobRepository");
//Employee CRUD
const getEmployees = (req) => __awaiter(void 0, void 0, void 0, function* () {
    return database_1.prisma.employee.findMany(Object.assign(Object.assign({}, (0, paginator_1.paginator)(req)), { where: {
            isActive: true
        }, include: {
            job: true,
            branchOffice: true
        } }));
});
exports.getEmployees = getEmployees;
const createEmployee = (req) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const data = req.body;
    const salary = data.salary || ((_a = (yield (0, jobRepository_1.getJobById)(data.jobId))) === null || _a === void 0 ? void 0 : _a.baseSalary);
    if (salary) {
        return database_1.prisma.employee.create({
            data: Object.assign(Object.assign({}, data), { salary: salary })
        });
    }
    else {
        return {};
    }
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
const deleteEmployee = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.body;
    return (0, crud_1.removeEntity)(database_1.prisma.employee, id);
});
exports.deleteEmployee = deleteEmployee;
//User CRUD
const getUsers = (req) => __awaiter(void 0, void 0, void 0, function* () {
    return database_1.prisma.user.findMany(Object.assign(Object.assign({}, (0, paginator_1.paginator)(req)), { where: {
            employee: {
                isActive: true
            }
        }, include: {
            employee: true
        } }));
});
exports.getUsers = getUsers;
const createUser = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    const user = yield database_1.prisma.user.create({
        data
    });
    return database_1.prisma.user.findFirst({
        where: {
            id: user.id
        },
        select: {
            email: true,
            id: true,
            name: true,
            employee: {
                select: {
                    branchOffice: true,
                    job: {
                        select: {
                            baseSalary: true,
                            description: true,
                            jobType: true,
                            id: true,
                            name: true
                        }
                    },
                    name: true,
                }
            }
        }
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
const login = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield database_1.prisma.user.findFirst({
        where: {
            password: req.body.password,
            email: req.body.email,
            employee: {
                isActive: true
            }
        },
        select: {
            email: true,
            id: true,
            name: true,
            employee: {
                select: {
                    branchOffice: true,
                    job: {
                        select: {
                            baseSalary: true,
                            description: true,
                            jobType: true,
                            id: true,
                            name: true
                        }
                    },
                    name: true,
                }
            }
        }
    });
    return user || {};
});
exports.login = login;
//# sourceMappingURL=profileRepository.js.map