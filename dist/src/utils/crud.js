"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateCleaner = void 0;
const updateCleaner = (data, key) => {
    const pk = data[key];
    delete data[key];
    return [pk, data];
};
exports.updateCleaner = updateCleaner;
