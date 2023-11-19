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
exports.gainMetric = void 0;
const logRepository_1 = require("../../database/logRepository");
const enums_1 = require("../../enum/enums");
const database_1 = require("../../models/database");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const success_rate = Number(process.env.SUCCESS_RATE);
const getOrders = () => __awaiter(void 0, void 0, void 0, function* () {
    return database_1.prisma.order.groupBy({
        by: ['brachOfficeId', "originId"],
        _sum: {
            total: true,
            cost: true,
        },
        orderBy: [
            { brachOfficeId: 'asc' },
            { originId: 'asc' }
        ],
        where: {
            orderStatusId: enums_1.OrderStatus.DELIVERED,
        }
    });
});
function getRate(el) {
    const total = el._sum.total || 0;
    const cost = el._sum.cost || 0;
    const rate = ((total - cost) / total) * 100;
    return rate;
}
const gainMetric = () => __awaiter(void 0, void 0, void 0, function* () {
    const income = (yield getOrders()).map(el => {
        const rate = getRate(el);
        return Object.assign(Object.assign({}, el), { rate });
    });
    const filteredIncome = income.filter(el => el.rate > success_rate);
    const costs = yield (0, logRepository_1.getCosts)(filteredIncome);
    const newData = filteredIncome.map((el, index) => {
        el._sum.cost = costs[index].totalcost;
        const rate = getRate(el);
        return Object.assign(Object.assign({}, el), { rate });
    });
    return newData.filter(el => el.rate > success_rate);
});
exports.gainMetric = gainMetric;
//# sourceMappingURL=gain.js.map