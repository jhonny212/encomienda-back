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
exports.getAllGoals = exports.getVehicleAllMovements = exports.getMovementsByVehicle = exports.getAllMovements = exports.getMovementsByBranch = void 0;
const roadRepository_1 = require("../../database/roadRepository");
const enums_1 = require("../../enum/enums");
const database_1 = require("../../models/database");
const getGoals = () => __awaiter(void 0, void 0, void 0, function* () {
    return database_1.prisma.order.groupBy({
        by: ['brachOfficeId'],
        _count: {
            _all: true
        },
        where: {
            orderStatusId: enums_1.OrderStatus.DELIVERED,
        }
    });
});
const getMovements = (filter) => __awaiter(void 0, void 0, void 0, function* () {
    return database_1.prisma.cost.groupBy({
        by: ['branchOfficeId', 'costTypeId'],
        _sum: {
            estimatedCost: true,
            finalCost: true,
        },
        where: Object.assign({}, filter)
    });
});
const getMovementsVehicle = (filter) => __awaiter(void 0, void 0, void 0, function* () {
    return database_1.prisma.vehicle.groupBy({
        by: ['branchOfficeId', 'vehicleTypeId'],
        _sum: {
            priceWeight: true,
        },
        where: Object.assign({}, filter)
    });
});
const getMovementsByBranch = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const filter = { branchOfficeId: id };
    const data = (yield getMovements(filter)).map(el => {
        return {
            branchOfficeId: el.branchOfficeId,
            Tipo: el.costTypeId,
            "Total estimado": el._sum.estimatedCost,
            "Total real": el._sum.finalCost
        };
    });
    return formatData(data);
});
exports.getMovementsByBranch = getMovementsByBranch;
const getAllMovements = () => __awaiter(void 0, void 0, void 0, function* () {
    const data = (yield getMovements({})).map(el => {
        return {
            branchOfficeId: el.branchOfficeId,
            Tipo: el.costTypeId,
            "Total estimado": el._sum.estimatedCost,
            "Total real": el._sum.finalCost
        };
    });
    return formatData(data);
});
exports.getAllMovements = getAllMovements;
const getMovementsByVehicle = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const filter = { vehicleTypeId: id };
    const data = (yield getMovementsVehicle(filter)).map(el => {
        return {
            brachOfficeId: el.branchOfficeId,
            Tipo: el.vehicleTypeId,
            "Total": el._sum.priceWeight,
        };
    });
    return formatData(data);
});
exports.getMovementsByVehicle = getMovementsByVehicle;
const getVehicleAllMovements = () => __awaiter(void 0, void 0, void 0, function* () {
    const data = (yield getMovementsVehicle({})).map(el => {
        return {
            brachOfficeId: el.branchOfficeId,
            Tipo: el.vehicleTypeId,
            "Total": el._sum.priceWeight,
        };
    });
    return formatData(data);
});
exports.getVehicleAllMovements = getVehicleAllMovements;
function formatData(data) {
    return __awaiter(this, void 0, void 0, function* () {
        const newData = [];
        for (const el of data) {
            let b = (yield (0, roadRepository_1.getBranchById)(el.brachOfficeId))[0];
            newData.push(Object.assign({ sucursal: b.address }, el));
        }
        return newData;
    });
}
const getAllGoals = () => __awaiter(void 0, void 0, void 0, function* () {
    const goals = (yield getGoals()).map(el => {
        return {
            total: el._count._all,
            brachOfficeId: el.brachOfficeId
        };
    });
    return formatData(goals);
});
exports.getAllGoals = getAllGoals;
//# sourceMappingURL=movements.js.map