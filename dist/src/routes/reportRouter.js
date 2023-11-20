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
exports.reportRouter = void 0;
const express_1 = require("express");
const movements_1 = require("../scripts/reports/movements");
exports.reportRouter = (0, express_1.Router)();
function generateExcel() {
}
exports.reportRouter.get('/movements/:branch', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield (0, movements_1.getMovementsByBranch)(Number(req.params.branch));
        console.log(data);
        return res.status(200).json(data);
    }
    catch (error) {
        res.status(500).json(error);
    }
}));
//# sourceMappingURL=reportRouter.js.map