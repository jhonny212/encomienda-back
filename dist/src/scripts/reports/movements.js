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
exports.getAllMovements = exports.getMovementsByBranch = void 0;
const database_1 = require("../../models/database");
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
const getMovementsByBranch = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const filter = { branchOfficeId: 1 };
    const data = (yield getMovements(filter)).map(el => {
        return {
            Sucursal: el.branchOfficeId,
            Tipo: el.costTypeId,
            "Total estimado": el._sum.estimatedCost,
            "Total real": el._sum.finalCost
        };
    });
});
exports.getMovementsByBranch = getMovementsByBranch;
const getAllMovements = () => __awaiter(void 0, void 0, void 0, function* () {
    return getMovements({});
});
exports.getAllMovements = getAllMovements;
//# sourceMappingURL=movements.js.map