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
exports.deleteCost = exports.createCost = exports.getAlllCost = exports.deleteCostType = exports.createCostType = exports.getAlllCostType = void 0;
const database_1 = require("../models/database");
const paginator_1 = require("../utils/paginator");
const crud_1 = require("../utils/crud");
const getAlllCostType = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const options = (0, paginator_1.paginator)(req);
    return database_1.prisma.costType.findMany(Object.assign(Object.assign({}, options), { where: {
            isActive: true
        } }));
});
exports.getAlllCostType = getAlllCostType;
const createCostType = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    return database_1.prisma.costType.create({
        data: Object.assign({}, body)
    });
});
exports.createCostType = createCostType;
const deleteCostType = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.body;
    return (0, crud_1.removeEntity)(database_1.prisma.costType, id);
});
exports.deleteCostType = deleteCostType;
const getAlllCost = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const options = (0, paginator_1.paginator)(req);
    return database_1.prisma.cost.findMany(Object.assign(Object.assign({ where: {
            costType: {
                isActive: true
            }
        } }, options), { include: {
            costType: true,
            branchOffice: true
        } }));
});
exports.getAlllCost = getAlllCost;
const createCost = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    return database_1.prisma.cost.create({
        data: Object.assign({}, body)
    });
});
exports.createCost = createCost;
const deleteCost = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.body;
    return (0, crud_1.removeEntity)(database_1.prisma.cost, id);
});
exports.deleteCost = deleteCost;
//# sourceMappingURL=costRepository.js.map