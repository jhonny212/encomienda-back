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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.routeMetric = void 0;
const roadRepository_1 = require("../../database/roadRepository");
const database_1 = require("../../models/database");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const error_rate = Number(process.env.ERROR_RATE);
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
function getDataX(data) {
    return __awaiter(this, void 0, void 0, function* () {
        const newData = [];
        for (const el of data) {
            const origin = (yield (0, roadRepository_1.getBranchById)((el === null || el === void 0 ? void 0 : el.originId) || -1))[0];
            const destiny = (yield (0, roadRepository_1.getBranchById)((el === null || el === void 0 ? void 0 : el.brachOfficeId) || -1))[0];
            newData.push(`${origin.city.name} - ${destiny.city.name}`);
        }
        return newData;
    });
}
const routeMetric = () => __awaiter(void 0, void 0, void 0, function* () {
    const tracking = yield getTracking();
    const newData = tracking.map(el => {
        return Object.assign(Object.assign({}, el), { errorRate: el.unpassedTrack / (el.unpassedTrack + el.passedTrack) });
    }).filter(el => el.errorRate < error_rate);
    const dataX = yield getDataX(newData);
    const dataY = newData.map(el => el.errorRate);
    return {
        dataX,
        dataY
    };
});
exports.routeMetric = routeMetric;
//# sourceMappingURL=route.js.map