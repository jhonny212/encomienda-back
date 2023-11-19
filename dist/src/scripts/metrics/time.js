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
exports.timeMetric = void 0;
const enums_1 = require("../../enum/enums");
const database_1 = require("../../models/database");
const getOrders = () => __awaiter(void 0, void 0, void 0, function* () {
    const sql = `SELECT
        o."brachOfficeId",
        o."originId",
        AVG(EXTRACT(EPOCH FROM (o."deliveredDate" - o."date")) / 60) AS averageTime,
        count(*) as total
    FROM
        "Order" o
    WHERE o."orderStatusId" = ${enums_1.OrderStatus.DELIVERED}
    GROUP BY
    o."brachOfficeId", o."originId" 
    ORDER BY averageTime ASC;`;
    const data = yield database_1.prisma.$queryRawUnsafe(sql);
    return data;
});
const timeMetric = () => __awaiter(void 0, void 0, void 0, function* () {
    return getOrders();
});
exports.timeMetric = timeMetric;
//# sourceMappingURL=time.js.map