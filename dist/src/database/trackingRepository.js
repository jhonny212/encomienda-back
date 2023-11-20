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
exports.trackQr = exports.generateQRCode = exports.moveOrder = exports.updateLog = exports.updateTracking = exports.createTracking = exports.getPath = void 0;
const database_1 = require("../models/database");
const bestRoute_1 = require("../scripts/bestRoute");
const orderRepository_1 = require("./orderRepository");
const logRepository_1 = require("./logRepository");
const dotenv_1 = __importDefault(require("dotenv"));
const enums_1 = require("../enum/enums");
const QRCode = require('qrcode');
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
            vehicleCost: vehicles[route.originId].total
        };
        bulkTracking.push(el);
    });
    const result = yield database_1.prisma.tracking.createMany({
        data: bulkTracking
    });
});
exports.createTracking = createTracking;
const updateTracking = (data, id) => __awaiter(void 0, void 0, void 0, function* () {
    return database_1.prisma.tracking.update({
        data,
        where: {
            id
        }
    });
});
exports.updateTracking = updateTracking;
const updateLog = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return database_1.prisma.tracking.update({
        data: { passed: true },
        where: {
            id
        }
    });
});
exports.updateLog = updateLog;
const forceTracking = (newRoute, order) => __awaiter(void 0, void 0, void 0, function* () {
    const vehicle = yield database_1.prisma.vehicle.findFirst({
        where: {
            branchOfficeId: newRoute.originId,
        }
    });
    const totalWeight = yield database_1.prisma.package.aggregate({
        _sum: {
            weight: true
        },
        where: {
            orderId: order
        }
    });
    const log = {
        orderId: order,
        passed: false,
        routeId: newRoute.id || 0,
        //Calculate
        cost: newRoute.costWeight * (totalWeight._sum.weight || 0),
        total: newRoute.priceWeight * (totalWeight._sum.weight || 0),
        vehicleCost: ((vehicle === null || vehicle === void 0 ? void 0 : vehicle.priceWeight) || 0) * (totalWeight._sum.weight || 0),
        vehicleId: (vehicle === null || vehicle === void 0 ? void 0 : vehicle.id) || 0
    };
    return log;
});
const moveOrder = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const response = {
        message: "",
        completed: false
    };
    //Get tracking
    const getTrack = (orderId, passed, take) => {
        return database_1.prisma.tracking.findMany({
            where: {
                orderId,
                passed
            },
            orderBy: {
                id: 'asc'
            },
            select: {
                id: true,
                passed: true,
                route: true
            },
            take
        });
    };
    const { order, force, newRoute } = req.body;
    const paths = yield getTrack(order, false, 2);
    const orderInfo = yield database_1.prisma.order.findFirst({
        where: {
            id: order
        },
    });
    if (!orderInfo) {
        response.message = "No se encontro la orden";
        return response;
    }
    if (orderInfo.orderStatusId == enums_1.OrderStatus.DELIVERED) {
        response.message = "La orden ya ha sido entregada";
        return response;
    }
    if (orderInfo.orderStatusId == enums_1.OrderStatus.CANCELED) {
        response.message = "La orden fue cancelada";
        return response;
    }
    const logs = yield (0, logRepository_1.getLogsByOrder)(order, { type: 'desc' }, 1, false);
    const validLog = logs.length == 0 || logs[0].route.originId == paths[0].route.originId;
    let logResult = { cost: 0, orderId: 0, passed: true, routeId: 0, total: 0, vehicleCost: 0, vehicleId: 0 };
    //Check if theres actual and next tracking
    if (paths.length > 1 && validLog) {
        const actualTrack = paths[0];
        const nextTrack = paths[1];
        //Get next branch
        const nextBranch = yield database_1.prisma.branchOffice.findFirst({
            where: {
                id: nextTrack.route.originId,
                isActive: true
            }
        });
        if (nextBranch && !force) {
            const result = yield (0, exports.updateTracking)({ passed: true }, actualTrack.id);
            if (result.passed) {
                const log = yield forceTracking(actualTrack.route, order);
                logResult = yield (0, logRepository_1.createNewLog)(log);
            }
        }
        else if (force) {
            //Force logic
            const result = yield (0, exports.updateTracking)({ passed: true }, actualTrack.id);
            if (result.passed) {
                const log = yield forceTracking(newRoute, order);
                logResult = yield (0, logRepository_1.createNewLog)(log);
            }
            else {
                response.message = "Error al mover a nueva ruta, intente de nuevo.";
            }
        }
    }
    else if (!validLog) {
        //Froce logic with logs and no tracking
        const log = yield forceTracking(newRoute, order);
        logResult = yield (0, logRepository_1.createNewLog)(log);
    }
    else {
        //FINAL BRANCH
        const finalTrack = paths[0];
        const result = yield (0, exports.updateTracking)({ passed: true }, finalTrack.id);
        if (result.passed) {
            const log = yield forceTracking(finalTrack.route, order);
            logResult = yield (0, logRepository_1.createNewLog)(log);
        }
    }
    if (logResult.id) {
        if (logs.length) {
            (0, exports.updateLog)(logs[0].id);
        }
        const finalRoute = yield database_1.prisma.route.findFirst({
            where: {
                id: logResult.routeId
            }
        });
        if (orderInfo.brachOfficeId == (finalRoute === null || finalRoute === void 0 ? void 0 : finalRoute.destinationId)) {
            response.message = "La orden ha sido entregada a la sucursal final";
            yield (0, orderRepository_1.updateOrder)({ orderStatusId: enums_1.OrderStatus.DELIVERED, deliveredDate: new Date() }, order);
        }
        else {
            response.message = "Orden actualizada";
            yield (0, orderRepository_1.updateOrder)({ orderStatusId: enums_1.OrderStatus.INROAD }, order);
        }
        response.completed = true;
    }
    else {
        response.message = "Error al actualizar";
    }
    return response;
});
exports.moveOrder = moveOrder;
const generateQRCode = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const { orderId } = req.params;
    dotenv_1.default.config();
    const port = process.env.PORT_FRONT;
    const host = process.env.HOST_FRONT;
    const url = yield QRCode.toDataURL(`${host}${port}/tracking/${orderId}`);
    return { url };
});
exports.generateQRCode = generateQRCode;
const trackQr = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const { orderId } = req.params;
    return database_1.prisma.log.findMany({
        where: { orderId: Number(orderId) },
        select: {
            cost: true,
            date: true,
            id: true,
            order: {
                select: {
                    address: true,
                    brachOffice: true,
                    client: true,
                    cost: true,
                    date: true,
                    deliveredDate: true,
                    description: true,
                    email: true,
                    id: true,
                    orderStatus: true,
                    origin: true,
                    phone: true,
                    total: true
                }
            },
            passed: true,
            route: {
                select: {
                    costWeight: true,
                    destination: true,
                    id: true,
                    isActive: true,
                    name: true,
                    origin: true,
                    priceWeight: true,
                    weight: true,
                }
            },
            total: true,
            vehicle: true,
            vehicleCost: true,
        },
        orderBy: {
            id: 'asc'
        }
    });
});
exports.trackQr = trackQr;
//# sourceMappingURL=trackingRepository.js.map