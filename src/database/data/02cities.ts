import {prisma} from '../../models/database'

async function seedCities() {


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
    await prisma.city.create({
      data: {
        name: city.name,
        department: {
          connect: { id: city.departmentId },
        },
      },
    });
  }

  await prisma.$disconnect();
}

seedCities()
  .catch((error) => {
    console.error('Error seeding cities:', error);
  })
  .finally(() => {
    process.exit(0);
  });