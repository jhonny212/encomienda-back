"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCost = exports.getAlllCost = exports.createCostType = exports.getAlllCostType = void 0;
const database_1 = require("../models/database");
const paginator_1 = require("../utils/paginator");
const getAlllCostType = (req) => {
    const options = (0, paginator_1.paginator)(req);
    return database_1.prisma.costType.findMany(Object.assign({}, options));
};
exports.getAlllCostType = getAlllCostType;
const createCostType = (req) => {
    const body = req.body;
    return database_1.prisma.costType.create({
        data: Object.assign({}, body)
    });
};
exports.createCostType = createCostType;
const getAlllCost = (req) => {
    const options = (0, paginator_1.paginator)(req);
    return database_1.prisma.cost.findMany(Object.assign(Object.assign({}, options), { include: {
            costType: true
        } }));
};
exports.getAlllCost = getAlllCost;
const createCost = (req) => {
    const body = req.body;
    return database_1.prisma.cost.create({
        data: Object.assign({}, body)
    });
};
exports.createCost = createCost;
