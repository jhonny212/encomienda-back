import {prisma} from '../../models/database'

async function seedDepartments() {

    const departmentsData = [
        'Alta Verapaz',
        'Baja Verapaz',
        'Chimaltenango',
        'Chiquimula',
        'El Progreso',
        'Escuintla',
        'Guatemala',
        'Huehuetenango',
        'Izabal',
        'Jalapa',
        'Jutiapa',
        'Petén',
        'Quetzaltenango',
        'Quiché',
        'Retalhuleu',
        'Sacatepéquez',
        'San Marcos',
        'Santa Rosa',
        'Sololá',
        'Suchitepéquez',
        'Totonicapán',
        'Zacapa',
    ];

    for (const departmentName of departmentsData) {
        await prisma.department.create({
            data: {
                name: departmentName,
            },
        });
    }

    await prisma.$disconnect();
}

seedDepartments()
    .catch((error) => {
        console.error('Error seeding departments:', error);
    })
    .finally(() => {
        process.exit(0);
    });


