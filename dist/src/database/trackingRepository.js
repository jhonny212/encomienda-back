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
exports.getPath = exports.getTracking = exports.generateQrCode = exports.updateStatusOrder = exports.assignVehicle = exports.moveOrder = void 0;
const database_1 = require("../models/database");
const bestRoute_1 = require("../scripts/bestRoute");
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
                track: true,
                id: true,
                passed: true
            }
        });
    };
    const { id } = req.body;
    const actualTrack = yield getTrack(id, true);
    const nextTrack = yield getTrack(id, false);
    if ((nextTrack === null || nextTrack === void 0 ? void 0 : nextTrack.track.isActive) && (actualTrack === null || actualTrack === void 0 ? void 0 : actualTrack.passed)) {
        const result = yield database_1.prisma.tracking.update({
            data: {
                passed: true
            },
            where: {
                id: nextTrack === null || nextTrack === void 0 ? void 0 : nextTrack.id
            }
        });
        return result;
    }
    return {};
});
exports.moveOrder = moveOrder;
const assignVehicle = (routeId) => __awaiter(void 0, void 0, void 0, function* () {
    const vehicleAmount = database_1.prisma.tracking.count({
        where: {
            trackId: routeId,
        }
    });
});
exports.assignVehicle = assignVehicle;
const updateStatusOrder = (req) => __awaiter(void 0, void 0, void 0, function* () { });
exports.updateStatusOrder = updateStatusOrder;
const generateQrCode = (req) => __awaiter(void 0, void 0, void 0, function* () { });
exports.generateQrCode = generateQrCode;
const getTracking = (req) => __awaiter(void 0, void 0, void 0, function* () { });
exports.getTracking = getTracking;
const getPath = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const best = req.body.best;
    if (best) {
        return (0, bestRoute_1.getBestPath)(req.body.origin, req.body.destiny);
    }
    else {
        return (0, bestRoute_1.getAllPaths)(req.body.origin, req.body.destiny);
    }
});
exports.getPath = getPath;
//# sourceMappingURL=trackingRepository.js.map