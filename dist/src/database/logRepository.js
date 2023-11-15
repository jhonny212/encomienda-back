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
exports.createNewLog = exports.getLogsByOrder = void 0;
const database_1 = require("../models/database");
const getLogsByOrder = (orderId, order, take) => __awaiter(void 0, void 0, void 0, function* () {
    return database_1.prisma.log.findMany({
        take,
        where: {
            orderId,
        },
        orderBy: {
            id: order.type
        },
        select: {
            route: true
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
//# sourceMappingURL=logRepository.js.map