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
exports.deleteJobType = exports.getJobTypeById = exports.createJobType = exports.getAllTypeJobs = void 0;
const database_1 = require("../models/database");
const paginator_1 = require("../utils/paginator");
const crud_1 = require("../utils/crud");
const getAllTypeJobs = (req, res, pageSize = 0) => __awaiter(void 0, void 0, void 0, function* () {
    const options = (0, paginator_1.paginator)(req);
    return database_1.prisma.jobType.findMany(Object.assign(Object.assign({}, options), { where: {
            isActive: true
        } }));
});
exports.getAllTypeJobs = getAllTypeJobs;
//Creates
const createJobType = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    return database_1.prisma.jobType.create({
        data: Object.assign({}, body)
    });
});
exports.createJobType = createJobType;
const getJobTypeById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return database_1.prisma.jobType.findFirst({
        where: {
            id
        }
    });
});
exports.getJobTypeById = getJobTypeById;
const deleteJobType = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.body;
    return (0, crud_1.removeEntity)(database_1.prisma.jobType, id);
});
exports.deleteJobType = deleteJobType;
//# sourceMappingURL=jobTypeRepository.js.map