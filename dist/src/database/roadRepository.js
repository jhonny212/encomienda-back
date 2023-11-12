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
exports.updateRoute = exports.updateBranch = exports.createRoute = exports.createBranch = exports.getRoutes = exports.getDepartments = exports.getCities = exports.getBranches = void 0;
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
    return database_1.prisma.branchOffice.findMany(Object.assign(Object.assign({}, (0, paginator_1.paginator)(req)), { include: {
            city: true,
        } }));
});
exports.getBranches = getBranches;
const getCities = (req, filters = {}) => __awaiter(void 0, void 0, void 0, function* () {
    return database_1.prisma.city.findMany(Object.assign(Object.assign({}, (0, paginator_1.paginator)(req, filters)), { include: {
            department: true
        } }));
});
exports.getCities = getCities;
const getDepartments = (req, filters = {}) => __awaiter(void 0, void 0, void 0, function* () {
    return database_1.prisma.department.findMany((0, paginator_1.paginator)(req, filters));
});
exports.getDepartments = getDepartments;
/**NOT WORKING */
// export const getPaths= async  (req: Request, filters: {} = {})=>{
//     return prisma.path.findMany({
//         ...paginator(req),
//         where: {
//             ...filters  
//         },
//         include: {
//             origin: true,
//             destination: true,
//         }
//     })
// }
const getRoutes = (req, filters = {}) => __awaiter(void 0, void 0, void 0, function* () {
    return database_1.prisma.route.findMany(Object.assign(Object.assign({}, (0, paginator_1.paginator)(req)), { where: Object.assign({}, filters), include: {
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
/**NOT WORKING */
// export const createPath = async  (req: Request) => {
//     const body = req.body as PathRequest
//     return prisma.path.create({
//         data: {
//             ...body
//         }
//     })
// }
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
    console.log(data);
    return database_1.prisma.branchOffice.update({
        data,
        where: {
            id: pk
        }
    });
});
exports.updateBranch = updateBranch;
// export const updatePath = async  (req: Request) =>{
//     const [pk, newdata ]= updateCleaner(req,"id")
//     const data = newdata as PathRequest
//     return prisma.path.update({
//         data,
//         where: {
//             id: pk
//         }
//     })
// }
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
//# sourceMappingURL=roadRepository.js.map