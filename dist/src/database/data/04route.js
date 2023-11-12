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
const database_1 = require("../../models/database");
function generateRandomNumber(min = 1, max = 5) {
    const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    return randomNumber;
}
function fillRoutes(size = 10) {
    return __awaiter(this, void 0, void 0, function* () {
        const branches = yield database_1.prisma.branchOffice.findMany();
        const paths = [];
        for (let index = 0; index < branches.length; index++) {
            const branch = branches[index];
            if (!(index + 1 === branches.length)) {
                for (let index2 = index + 1; index2 < branches.length; index2++) {
                    const branch2 = branches[index2];
                    const tmp = {
                        name: "branch",
                        originId: branch.id,
                        destinationId: branch2.id,
                        weight: generateRandomNumber(1, 6),
                        costWeight: 0,
                        isActive: true,
                        priceWeight: 0,
                    };
                    paths.push(tmp);
                }
            }
        }
        const result = yield database_1.prisma.route.createMany({
            data: paths
        });
    });
}
fillRoutes();
//# sourceMappingURL=04route.js.map