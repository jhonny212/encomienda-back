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
exports.getBestPath = exports.getAllPaths = void 0;
const database_1 = require("../models/database");
function getAllPaths(start, end) {
    return __awaiter(this, void 0, void 0, function* () {
        const routes = [];
        function getBestPath(idSearch) {
            return __awaiter(this, void 0, void 0, function* () {
                const path = yield database_1.prisma.route.findMany({
                    orderBy: {
                        weight: 'asc'
                    },
                    where: {
                        originId: idSearch,
                        id: {
                            notIn: []
                        }
                    }
                });
                return path;
            });
        }
        const createResponse = function (path) {
            return __awaiter(this, void 0, void 0, function* () {
                let tmp = [];
                for (let index = 0; index < path.length; index++) {
                    const origin = path[index];
                    const destiny = path[index + 1] || -1;
                    const element = yield database_1.prisma.route.findFirst({
                        where: {
                            originId: origin,
                            destinationId: destiny
                        }
                    });
                    if (element != null) {
                        tmp.push(element);
                    }
                }
                return tmp;
            });
        };
        function findPaths(start, end, visited = new Set(), path = []) {
            return __awaiter(this, void 0, void 0, function* () {
                visited.add(start);
                path.push(start);
                if (start === end) {
                    routes.push(yield createResponse(path));
                }
                else {
                    const paths = (yield getBestPath(start));
                    for (const nextPath of paths) {
                        if (!visited.has(nextPath.destinationId)) {
                            yield findPaths(nextPath.destinationId, end, visited, [...path]);
                        }
                    }
                }
                visited.delete(start);
                path.pop();
            });
        }
        yield findPaths(start, end);
        return routes;
    });
}
exports.getAllPaths = getAllPaths;
function getBestPath(start, end) {
    return __awaiter(this, void 0, void 0, function* () {
        const paths = yield getAllPaths(start, end);
        const weights = paths.map((path) => {
            return path.reduce((acum, el) => acum + el.weight, 0);
        });
        const minValue = Math.min(...weights);
        const indexMinValue = weights.indexOf(minValue);
        return paths[indexMinValue];
    });
}
exports.getBestPath = getBestPath;
//# sourceMappingURL=bestRoute.js.map