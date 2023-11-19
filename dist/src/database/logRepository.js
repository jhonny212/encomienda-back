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
    const branches = "(" + incomeFiltered.map(e => e.brachOfficeId).join(", ") + ")";
    const routes = "(" + incomeFiltered.map(e => e.routeId).join(", ") + ")";
    const sql = `SELECT
        o."brachOfficeId" , o."routeId",
        SUM(l."vehicleCost" + l."cost") AS totalCost
        FROM
            "Order" o
        JOIN
            "Log" l ON o.id = l."orderId"
        WHERE o."orderStatusId"=${enums_1.OrderStatus.DELIVERED}
        AND o."brachOfficeId" IN ${branches}
        AND o."routeId" IN ${routes}
        GROUP BY
            o."brachOfficeId", o."routeId"
        ORDER BY  o."brachOfficeId" ASC, o."routeId" ASC
            `;
    const data = yield database_1.prisma.$queryRawUnsafe(sql);
    return data;
});
exports.getCosts = getCosts;
//# sourceMappingURL=logRepository.js.map