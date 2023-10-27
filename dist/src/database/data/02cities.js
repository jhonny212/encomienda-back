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
function seedCities() {
    return __awaiter(this, void 0, void 0, function* () {
        const cityData = [
            { name: 'Chahal', departmentId: 1 },
            { name: 'Chisec', departmentId: 1 },
            { name: 'Cobán', departmentId: 1 },
            { name: 'Fray Bartolomé de las Casas', departmentId: 1 },
            { name: 'La Tinta', departmentId: 1 },
            { name: 'Lanquín', departmentId: 1 },
            { name: 'Panzós', departmentId: 1 },
            { name: 'Raxruhá', departmentId: 1 },
            { name: 'San Cristóbal Verapaz', departmentId: 1 },
            { name: 'San Juan Chamelco', departmentId: 1 },
            { name: 'San Pedro Carchá', departmentId: 1 },
            { name: 'Santa Cruz Verapaz', departmentId: 1 },
            { name: 'Santa María Cahabón', departmentId: 1 },
            { name: 'Senahú', departmentId: 1 },
            { name: 'Tactic', departmentId: 1 },
            { name: 'Tamahú', departmentId: 1 },
            { name: 'Tucurú', departmentId: 1 },
            { name: 'Cubulco', departmentId: 2 },
            { name: 'Granados', departmentId: 2 },
            { name: 'Purulhá', departmentId: 2 },
            // Agregar más ciudades con sus departmentId correspondientes
        ];
        for (const city of cityData) {
            yield database_1.prisma.city.create({
                data: {
                    name: city.name,
                    department: {
                        connect: { id: city.departmentId },
                    },
                },
            });
        }
        yield database_1.prisma.$disconnect();
    });
}
seedCities()
    .catch((error) => {
    console.error('Error seeding cities:', error);
})
    .finally(() => {
    process.exit(0);
});
