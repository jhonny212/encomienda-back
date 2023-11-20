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
exports.metricRouter = void 0;
const express_1 = require("express");
const gain_1 = require("../scripts/metrics/gain");
const time_1 = require("../scripts/metrics/time");
const route_1 = require("../scripts/metrics/route");
exports.metricRouter = (0, express_1.Router)();
const metrics = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const gain = yield (0, gain_1.gainMetric)();
    const time = yield (0, time_1.timeMetric)();
    const route = yield (0, route_1.routeMetric)();
    const gainData = {
        item: 'Metrica en base a ganancias',
        categories: gain.dataX,
        min: Math.min(...gain.dataY),
        max: Math.max(...gain.dataY),
        series: [
            {
                name: 'Ganancias', data: gain.dataY
            }
        ],
        colors: ['rgba(0,0,0,0.1)']
    };
    const timeData = {
        item: 'Metrica en base a tiempo promedio de entrega',
        categories: time.dataX,
        min: Math.min(...time.dataY),
        max: Math.max(...time.dataY),
        series: [
            {
                name: 'Tiempo promedio de entrega', data: time.dataY
            }
        ],
        colors: ['rgba(0,0,0,0.1)']
    };
    const tmp = route.dataY.map(el => Number(el));
    const routeData = {
        item: 'Metrica en base a paquetes entregados exitosamente en base al tracking original',
        categories: route.dataX,
        min: Math.min(...tmp),
        max: Math.max(...tmp),
        series: [
            {
                name: 'Entregas con exito', data: tmp
            }
        ],
        colors: ['rgba(0,0,0,0.1)']
    };
    return [
        gainData,
        timeData,
        routeData
    ];
});
exports.metricRouter.get('', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return res.status(200).json(yield metrics(req));
    }
    catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
}));
//# sourceMappingURL=metricRouter.js.map