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
exports.filterVehicle = exports.deleteVehicle = exports.updateVehicle = exports.createVehicle = exports.getVehicles = exports.deleteVehicleType = exports.updateVehicleType = exports.createVehicleType = exports.getVehicleTypes = void 0;
const database_1 = require("../models/database");
const paginator_1 = require("../utils/paginator");
const crud_1 = require("../utils/crud");
//CRUD VehicleType
const getVehicleTypes = (req) => {
    return database_1.prisma.vehicleType.findMany(Object.assign(Object.assign({}, (0, paginator_1.paginator)(req)), { where: {
            isActive: true
        } }));
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
const deleteVehicleType = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.body;
    return (0, crud_1.removeEntity)(database_1.prisma.vehicleType, id);
});
exports.deleteVehicleType = deleteVehicleType;
//CRUD Vehicle
const getVehicles = (req) => {
    return database_1.prisma.vehicle.findMany(Object.assign(Object.assign({}, (0, paginator_1.paginator)(req)), { include: {
            vehicleType: true,
            branchOffice: true
        }, where: {
            isActive: true,
            vehicleType: {
                isActive: true
            }
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
const deleteVehicle = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.body;
    return (0, crud_1.removeEntity)(database_1.prisma.vehicle, id);
});
exports.deleteVehicle = deleteVehicle;
const filterVehicle = (where = {}) => {
    return database_1.prisma.vehicle.findMany({
        where
    });
};
exports.filterVehicle = filterVehicle;
//# sourceMappingURL=vehicleRepository.js.map