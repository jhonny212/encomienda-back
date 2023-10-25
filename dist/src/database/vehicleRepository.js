"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateVehicle = exports.createVehicle = exports.getVehicles = exports.updateVehicleType = exports.createVehicleType = exports.getVehicleTypes = void 0;
const database_1 = require("../models/database");
const paginator_1 = require("../utils/paginator");
const crud_1 = require("../utils/crud");
//CRUD VehicleType
const getVehicleTypes = (req) => {
    return database_1.prisma.vehicleType.findMany(Object.assign({}, (0, paginator_1.paginator)(req)));
};
exports.getVehicleTypes = getVehicleTypes;
const createVehicleType = (req) => {
    const body = req.body;
    return database_1.prisma.vehicleType.create({
        data: Object.assign({}, body)
    });
};
exports.createVehicleType = createVehicleType;
const updateVehicleType = (req) => {
    const [pk, newdata] = (0, crud_1.updateCleaner)(req, "id");
    const data = newdata;
    return database_1.prisma.vehicleType.update({
        data,
        where: {
            id: pk
        }
    });
};
exports.updateVehicleType = updateVehicleType;
//CRUD Vehicle
const getVehicles = (req) => {
    return database_1.prisma.vehicle.findMany(Object.assign(Object.assign({}, (0, paginator_1.paginator)(req)), { include: {
            vehicleType: true
        } }));
};
exports.getVehicles = getVehicles;
const createVehicle = (req) => {
    const body = req.body;
    return database_1.prisma.vehicle.create({
        data: Object.assign({}, body)
    });
};
exports.createVehicle = createVehicle;
const updateVehicle = (req) => {
    const [pk, newdata] = (0, crud_1.updateCleaner)(req, "id");
    const data = newdata;
    return database_1.prisma.vehicle.update({
        data,
        where: {
            id: pk
        }
    });
};
exports.updateVehicle = updateVehicle;
