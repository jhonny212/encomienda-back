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
exports.getTracking = exports.generateQrCode = exports.updateStatusOrder = exports.moveOrder = exports.inital = void 0;
const inital = (req) => __awaiter(void 0, void 0, void 0, function* () { });
exports.inital = inital;
const moveOrder = (req) => __awaiter(void 0, void 0, void 0, function* () { });
exports.moveOrder = moveOrder;
const updateStatusOrder = (req) => __awaiter(void 0, void 0, void 0, function* () { });
exports.updateStatusOrder = updateStatusOrder;
const generateQrCode = (req) => __awaiter(void 0, void 0, void 0, function* () { });
exports.generateQrCode = generateQrCode;
const getTracking = (req) => __awaiter(void 0, void 0, void 0, function* () { });
exports.getTracking = getTracking;
