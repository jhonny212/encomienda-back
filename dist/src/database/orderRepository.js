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
exports.crearOrder = exports.getOrders = exports.getOrderById = exports.getPackagesByOrder = exports.getPackages = void 0;
const database_1 = require("../models/database");
const paginator_1 = require("../utils/paginator");
const roadRepository_1 = require("./roadRepository");
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
const crearOrder = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const order = req.body;
    /**
     * Get route for values to calculate prices
     */
    const route = (yield (0, roadRepository_1.getRoutes)(req, {
        where: { id: order.routeId }
    }))[0];
    /**
     * Set cost and price for each package
     */
    let packages = order.packages.map((p) => {
        return Object.assign(Object.assign({}, p), { cost: p.weight * route.costWeight, total: p.weight * route.priceWeight });
    });
    /**
     * Get total cost and total price
     */
    const total = packages.reduce((prev, curr) => prev + (curr.total || 0), 0);
    const cost = packages.reduce((prev, curr) => prev + (curr.cost || 0), 0);
    /**
     * Create order
     */
    delete order["id"];
    const orderInstance = yield database_1.prisma.order.create({
        data: Object.assign(Object.assign({}, order), { orderStatusId: 0, routeId: route.id, total,
            cost })
    });
    /**
     * Create packages
     */
    let data = packages.map((p) => {
        return Object.assign(Object.assign({}, p), { orderId: orderInstance.id });
    });
    return database_1.prisma.package.createMany({
        data
    });
});
exports.crearOrder = crearOrder;
