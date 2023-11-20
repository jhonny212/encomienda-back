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
exports.getCosts = exports.createNewLog = exports.getLogsByOrder = void 0;
const database_1 = require("../models/database");
const enums_1 = require("../enum/enums");
const getLogsByOrder = (orderId, order, take, passed = false) => __awaiter(void 0, void 0, void 0, function* () {
    return database_1.prisma.log.findMany({
        take,
        where: {
            orderId,
            passed
        },
        orderBy: {
            id: order.type
        },
        select: {
            route: true,
            id: true
        }
    });
});
exports.getLogsByOrder = getLogsByOrder;
const createNewLog = (log) => __awaiter(void 0, void 0, void 0, function* () {
    return database_1.prisma.log.create({
        data: log
    });
});
exports.createNewLog = createNewLog;
const getCosts = (incomeFiltered = []) => __awaiter(void 0, void 0, void 0, function* () {
    const branch = incomeFiltered.map(e => e.brachOfficeId);
    const route = incomeFiltered.map(e => e.originId);
    branch.push(-1);
    route.push(-1);
    const branches = "(" + branch.join(", ") + ")";
    const routes = "(" + route.join(", ") + ")";
    const sql = `SELECT
        o."brachOfficeId" , o."originId",
        SUM(l."vehicleCost" + l."cost") AS totalCost
        FROM
            "Order" o
        JOIN
            "Log" l ON o.id = l."orderId"
        WHERE o."orderStatusId"=${enums_1.OrderStatus.DELIVERED}
        AND o."brachOfficeId" IN ${branches}
        AND o."originId" IN ${routes}
        GROUP BY
            o."brachOfficeId", o."originId"
        ORDER BY  o."brachOfficeId" ASC, o."originId" ASC
            `;
    const data = yield database_1.prisma.$queryRawUnsafe(sql);
    return data;
});
exports.getCosts = getCosts;
//# sourceMappingURL=logRepository.js.map