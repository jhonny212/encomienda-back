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
exports.deleteEntity = exports.removeEntity = exports.GetResponsePaginated = exports.updateCleaner = void 0;
const database_1 = require("../models/database");
const updateCleaner = (req, key) => {
    const data = req.body;
    const pk = data[key];
    delete data[key];
    return [pk, data];
};
exports.updateCleaner = updateCleaner;
const GetResponsePaginated = (entity, data) => __awaiter(void 0, void 0, void 0, function* () {
    const totalSize = yield entity.count();
    return {
        data,
        totalSize
    };
});
exports.GetResponsePaginated = GetResponsePaginated;
const removeEntity = (entity, id) => __awaiter(void 0, void 0, void 0, function* () {
    return entity.update({
        data: {
            isActive: false
        },
        where: {
            id
        }
    });
});
exports.removeEntity = removeEntity;
const deleteEntity = (entity, id) => __awaiter(void 0, void 0, void 0, function* () {
    return database_1.prisma.city.delete({
        where: { id }
    });
});
exports.deleteEntity = deleteEntity;
//# sourceMappingURL=crud.js.map