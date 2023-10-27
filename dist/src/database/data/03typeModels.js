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
function seedOrderStatus() {
    return __awaiter(this, void 0, void 0, function* () {
        const orderStatusData = [
            { description: 'Se ha creado la orden con los paquetes', name: 'Orden Generada' },
            { description: 'Se ha cancelado el envio de la orden', name: 'Orden Cancelada' },
            { description: 'La orden se encuentra en ruta', name: 'Orden Enviada' },
            { description: 'La orden ha sido entregada', name: 'Orden Entregada' },
        ];
        yield database_1.prisma.orderStatus.createMany({
            data: orderStatusData
        });
        yield database_1.prisma.$disconnect();
    });
}
seedOrderStatus();
