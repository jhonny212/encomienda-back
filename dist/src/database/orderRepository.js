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
exports.crearOrder = exports.estimateVehicleCost = exports.getOrders = exports.getOrderById = exports.getPackagesByOrder = exports.getPackages = void 0;
const database_1 = require("../models/database");
const paginator_1 = require("../utils/paginator");
const trackingRepository_1 = require("./trackingRepository");
//Package crud
const getPackages = (req) => __awaiter(void 0, void 0, void 0, function* () {
    return database_1.prisma.package.findMany((0, paginator_1.paginator)(req));
});
exports.getPackages = getPackages;
const getPackagesByOrder = (req, orderId) => __awaiter(void 0, void 0, void 0, function* () {
    const whereClause = {
        where: {
            orderId
        }
    };
    return database_1.prisma.package.findMany((0, paginator_1.paginator)(req, whereClause));
});
exports.getPackagesByOrder = getPackagesByOrder;
//OrderCrud
const getOrderById = (req, id) => __awaiter(void 0, void 0, void 0, function* () {
    const whereClause = {
        where: {
            id
        }
    };
    return database_1.prisma.order.findFirst(Object.assign(Object.assign({}, (0, paginator_1.paginator)(req, whereClause)), { include: {
            brachOffice: true,
            orderStatus: true,
            Package: true,
            route: true
        } }));
});
exports.getOrderById = getOrderById;
const getOrders = (req) => __awaiter(void 0, void 0, void 0, function* () {
    return database_1.prisma.order.findMany(Object.assign(Object.assign({}, (0, paginator_1.paginator)(req)), { include: {
            brachOffice: true,
            orderStatus: true,
            Package: true,
            route: true
        } }));
});
exports.getOrders = getOrders;
//Order Logic
const estimateVehicleCost = (route) => __awaiter(void 0, void 0, void 0, function* () {
    const branchOffices = route === null || route === void 0 ? void 0 : route.map(el => el.originId);
    const vehicles = yield database_1.prisma.vehicle.groupBy({
        by: ['vehicleTypeId', 'branchOfficeId'],
        _avg: {
            priceWeight: true,
        },
        where: {
            branchOfficeId: {
                in: branchOffices
            }
        }
    });
    const groupedVehicles = {};
    vehicles.forEach(el => {
        if (groupedVehicles[el.branchOfficeId] !== undefined) {
            groupedVehicles[el.branchOfficeId].amount += 1;
            groupedVehicles[el.branchOfficeId].total += el._avg.priceWeight;
        }
        else {
            groupedVehicles[el.branchOfficeId] = {
                amount: 1,
                total: el._avg.priceWeight
            };
        }
    });
    let estimated = 0;
    for (const key in groupedVehicles) {
        const vehicle = groupedVehicles[key];
        estimated += vehicle.total / vehicle.amount;
    }
    return { estimated, groupedVehicles };
});
exports.estimateVehicleCost = estimateVehicleCost;
const crearOrder = (req) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    const order = req.body;
    /**
     * Get costs and prices based on the selected route
     */
    const routeCost = (_a = order.route) === null || _a === void 0 ? void 0 : _a.reduce((prev, curr) => prev + (curr.costWeight || 0), 0);
    const priceCost = (_b = order.route) === null || _b === void 0 ? void 0 : _b.reduce((prev, curr) => prev + (curr.priceWeight || 0), 0);
    /**
     * Get costs and prices based on a avg of vehicles
     */
    const { estimated, groupedVehicles } = yield (0, exports.estimateVehicleCost)(order.route || []);
    /**
     * Set cost and price for each package
     */
    let packages = (_c = order.packages) === null || _c === void 0 ? void 0 : _c.map((p) => {
        return Object.assign(Object.assign({}, p), { cost: (p.weight * (routeCost || 0)) + estimated * p.weight, total: (p.weight * (priceCost || 0)) + estimated * p.weight });
    });
    /**
     * Get total cost and total price
     */
    const total = packages === null || packages === void 0 ? void 0 : packages.reduce((prev, curr) => prev + (curr.total || 0), 0);
    const cost = packages === null || packages === void 0 ? void 0 : packages.reduce((prev, curr) => prev + (curr.cost || 0), 0);
    /**
     * Create order
     */
    const { email, client, address, phone, description } = order;
    const routeId = order.route ? order.route[0].id : 0;
    const destiny = order.route ? order.route[order.route.length - 1].destinationId : 0;
    const orderData = {
        //Basic info
        email,
        client,
        address,
        phone,
        description,
        //Auto info
        orderStatusId: 1,
        brachOfficeId: destiny,
        routeId,
        total: total || 0,
        cost: cost || 0,
    };
    const orderInstance = yield database_1.prisma.order.create({
        data: Object.assign({}, orderData)
    });
    /**
     * Create packages
     */
    let data = packages === null || packages === void 0 ? void 0 : packages.map((p) => {
        return Object.assign(Object.assign({}, p), { orderId: orderInstance.id });
    });
    yield database_1.prisma.package.createMany({
        data: data || []
    });
    (0, trackingRepository_1.createTracking)((order === null || order === void 0 ? void 0 : order.route) || [], orderInstance.id, groupedVehicles);
    return {
        data,
        vehiclePriceByWeight: estimated,
        packagePriceByWeight: priceCost
    };
});
exports.crearOrder = crearOrder;
//# sourceMappingURL=orderRepository.js.map