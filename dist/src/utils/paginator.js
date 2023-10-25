"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.paginator = void 0;
const paginator = (req, filters = {}) => {
    const pageSize = Number(req.query.pageSize) || -1;
    const page = Number(req.query.page) || 0;
    if (pageSize == -1)
        return {};
    return Object.assign({ skip: page * pageSize, take: pageSize }, filters);
};
exports.paginator = paginator;
