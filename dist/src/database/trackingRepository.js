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
exports.assignVehicle = exports.moveOrder = exports.createTracking = exports.getPath = void 0;
const database_1 = require("../models/database");
const bestRoute_1 = require("../scripts/bestRoute");
const getPath = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const { origin, destiny, type } = req.body;
    if (Number(type) == 1) {
        return (0, bestRoute_1.getBestPath)(Number(origin), Number(destiny));
    }
    else {
        const routes = yield (0, bestRoute_1.getAllRoutes)(Number(origin), Number(destiny));
        const sumWeight = (route) => route.reduce((sum, r) => sum + r.weight, 0);
        const sortedRoutes = routes.sort((a, b) => sumWeight(a) - sumWeight(b));
        return sortedRoutes;
    }
});
exports.getPath = getPath;
const createTracking = (routes, orderId, vehicles) => __awaiter(void 0, void 0, void 0, function* () {
    const bulkTracking = [];
    routes.forEach(route => {
        const el = {
            routeId: route.id || 0,
            cost: route.costWeight,
            price: route.priceWeight,
            orderId,
            vechicleCost: vehicles[route.originId].total
        };
        bulkTracking.push(el);
    });
    database_1.prisma.tracking.createMany({
        data: bulkTracking
    });
});
exports.createTracking = createTracking;
const moveOrder = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const getTrack = (id, passed) => {
        return database_1.prisma.tracking.findFirst({
            where: {
                id,
                passed
            },
            orderBy: {
                id: 'asc'
            },
            select: {
                //track: true,
                id: true,
                passed: true
            }
        });
    };
    const { id } = req.body;
    const actualTrack = yield getTrack(id, true);
    const nextTrack = yield getTrack(id, false);
    // if(nextTrack?.track.isActive && actualTrack?.passed){
    //     const result = await prisma.tracking.update({
    //         data: {
    //             passed: true
    //         },
    //         where: {
    //             id: nextTrack?.id
    //         }
    //     })
    //     return result
    // }
    return {};
});
exports.moveOrder = moveOrder;
const assignVehicle = (routeId) => __awaiter(void 0, void 0, void 0, function* () {
    const vehicleAmount = database_1.prisma.tracking.count({
        where: {
        //trackId: routeId,
        }
    });
});
exports.assignVehicle = assignVehicle;
//# sourceMappingURL=trackingRepository.js.map