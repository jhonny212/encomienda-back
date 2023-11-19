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
exports.routeMetric = void 0;
const database_1 = require("../../models/database");
const getTracking = () => __awaiter(void 0, void 0, void 0, function* () {
    const sql = `SELECT
        "brachOfficeId",
        "originId",
        SUM(CASE WHEN "passed" THEN 1 ELSE 0 END) AS "passedTrack",
        SUM(CASE WHEN "passed" = false THEN 1 ELSE 0 END) AS "unpassedTrack"
    FROM "Tracking"
    INNER JOIN "Order" ON "Order"."id" = "Tracking"."orderId"
    GROUP BY "Order"."brachOfficeId", "Order"."originId";`;
    return database_1.prisma.$queryRawUnsafe(sql);
});
const routeMetric = () => __awaiter(void 0, void 0, void 0, function* () {
    const tracking = yield getTracking();
    const newData = tracking.map(el => {
    });
});
exports.routeMetric = routeMetric;
//# sourceMappingURL=route.js.map