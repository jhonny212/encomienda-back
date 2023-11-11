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
exports.createCost = exports.getAlllCost = exports.createCostType = exports.getAlllCostType = void 0;
const database_1 = require("../models/database");
const paginator_1 = require("../utils/paginator");
const getAlllCostType = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const options = (0, paginator_1.paginator)(req);
    return database_1.prisma.costType.findMany(Object.assign({}, options));
});
exports.getAlllCostType = getAlllCostType;
const createCostType = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    return database_1.prisma.costType.create({
        data: Object.assign({}, body)
    });
});
exports.createCostType = createCostType;
const getAlllCost = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const options = (0, paginator_1.paginator)(req);
    return database_1.prisma.cost.findMany(Object.assign(Object.assign({}, options), { include: {
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
//# sourceMappingURL=costRepository.js.map