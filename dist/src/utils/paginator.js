"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.paginator = void 0;
const paginator = (req, filters = {}) => {
    console.log(req.query);
    const pageSize = Number(req.query.pageSize) || -1;
    const page = Number(req.query.page) || 10;
    if (pageSize == -1)
        return {};
    return Object.assign({ skip: page, take: pageSize }, filters);
};
exports.paginator = paginator;
