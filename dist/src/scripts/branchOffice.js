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
const database_1 = require("../models/database");
const metric = {
    ganancia: 1,
    paquetes: 2,
    viabilidad: 3
};
const getOrders = () => __awaiter(void 0, void 0, void 0, function* () {
    const orders1 = database_1.prisma.order.findMany({
        orderBy: {
            total: 'asc'
        },
        select: {
            id: true,
            cost: true,
            total: true,
            brachOfficeId: true,
            routeId: true
        }
    });
});
//# sourceMappingURL=branchOffice.js.map