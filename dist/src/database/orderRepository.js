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
exports.getOrdersByBranch = exports.crearOrder = exports.estimateOrderCost = exports.estimateVehicleCost = exports.deleteOrder = exports.updateOrder = exports.getOrders = exports.getOrderById = exports.getPackagesByOrder = exports.getPackages = void 0;
const database_1 = require("../models/database");
const paginator_1 = require("../utils/paginator");
const trackingRepository_1 = require("./trackingRepository");
const enums_1 = require("../enum/enums");
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
    return database_1.prisma.package.findMany(Object.assign(Object.assign({}, (0, paginator_1.paginator)(req)), whereClause));
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
            route: true,
            origin: true
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
const updateOrder = (data, id) => __awaiter(void 0, void 0, void 0, function* () {
    return database_1.prisma.order.update({
        data: Object.assign({}, data),
        where: {
            id
        }
    });
});
exports.updateOrder = updateOrder;
const deleteOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    return (0, exports.updateOrder)({ orderStatusId: enums_1.OrderStatus.CANCELED }, req.body.id);
});
exports.deleteOrder = deleteOrder;
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
const estimateOrderCost = (route, packagesData) => __awaiter(void 0, void 0, void 0, function* () {
    /**
     * Get costs and prices based on the selected route
     */
    const routeCost = route === null || route === void 0 ? void 0 : route.reduce((prev, curr) => prev + (curr.costWeight || 0), 0);
    const priceCost = route === null || route === void 0 ? void 0 : route.reduce((prev, curr) => prev + (curr.priceWeight || 0), 0);
    /**
     * Get costs and prices based on a avg of vehicles
     */
    const { estimated, groupedVehicles } = yield (0, exports.estimateVehicleCost)(route || []);
    /**
     * Set cost and price for each package
     */
    let packages = packagesData === null || packagesData === void 0 ? void 0 : packagesData.map((p) => {
        return Object.assign(Object.assign({}, p), { cost: (p.weight * (routeCost || 0)) + estimated * p.weight, total: (p.weight * (priceCost || 0)) + estimated * p.weight });
    });
    /**
     * Get total cost and total price
     */
    const total = packages === null || packages === void 0 ? void 0 : packages.reduce((prev, curr) => prev + (curr.total || 0), 0);
    const cost = packages === null || packages === void 0 ? void 0 : packages.reduce((prev, curr) => prev + (curr.cost || 0), 0);
    return { total, cost, packages, estimated, priceCost, groupedVehicles };
});
exports.estimateOrderCost = estimateOrderCost;
const crearOrder = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const order = req.body;
    /**
     * Get costs
     */
    const { cost, total, packages, estimated, groupedVehicles, priceCost } = yield (0, exports.estimateOrderCost)(order.route || [], order.packages || []);
    /**
     * Create order
     */
    const { email, client, address, phone, description } = order;
    const routeId = order.route ? order.route[0].id : 0;
    const destiny = order.route ? order.route[order.route.length - 1].destinationId : 0;
    const originId = order.route ? order.route[order.route.length - 1].originId : 0;
    const orderData = {
        //Basic info
        email,
        client,
        address,
        phone,
        description,
        //Auto info
        orderStatusId: enums_1.OrderStatus.PENDING,
        brachOfficeId: destiny,
        routeId,
        total: total || 0,
        cost: cost || 0,
        originId
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
const getOrdersByBranch = (brachOfficeId) => {
    return database_1.prisma.log.findMany({
        where: {
            route: {
                originId: brachOfficeId
            },
            passed: false
        },
        select: {
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
            }
        }
    });
};
exports.getOrdersByBranch = getOrdersByBranch;
//# sourceMappingURL=orderRepository.js.map