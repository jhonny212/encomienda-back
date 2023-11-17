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
exports.gainMetric = void 0;
const logRepository_1 = require("../database/logRepository");
const database_1 = require("../models/database");
const metric = {
    ganancia: 1,
    paquetes: 2,
    viabilidad: 3
};
const getOrders = () => __awaiter(void 0, void 0, void 0, function* () {
    return database_1.prisma.order.groupBy({
        by: ['brachOfficeId', 'routeId'],
        _sum: {
            total: true,
        },
        orderBy: {
            _sum: {
                total: 'desc'
            }
        },
    });
});
const gainMetric = () => __awaiter(void 0, void 0, void 0, function* () {
    const income = yield getOrders();
    const costs = yield (0, logRepository_1.getCosts)();
    console.log(costs);
});
exports.gainMetric = gainMetric;
//# sourceMappingURL=branchOffice.js.map