import { prisma } from '../../models/database'

async function seedOrderStatus() {
    const orderStatusData: any[] = [
        { description: 'Se ha creado la orden con los paquetes', name: 'Orden Generada' },
        { description: 'Se ha cancelado el envio de la orden', name: 'Orden Cancelada' },
        { description: 'La orden se encuentra en ruta', name: 'Orden Enviada' },
        { description: 'La orden ha sido entregada', name: 'Orden Entregada' },
    ]


    await prisma.orderStatus.createMany({
        data: orderStatusData
    })
    await prisma.$disconnect();

}

async function seedCostType() {
    const costTypeSeedData = [
        { name: "Mantenimiento" },
        { name: "Reparación" },
        { name: "Asesoría Legal" },
        { name: "Asesoría Informática" },
        { name: "Fletes" },
        { name: "Suministros de Oficina" },
        { name: "Publicidad y Marketing" },
        { name: "Seguros" },
        { name: "Impuestos" },
        { name: "Alquiler de Equipos" },
        { name: "Capacitación" },
        { name: "Energía Eléctrica" },
        { name: "Agua y Saneamiento" },
        { name: "Materia Prima" },
        { name: "Viajes de Negocios" },
        { name: "Costos de Envío" },
        { name: "Servicios de Consultoría" },
        { name: "Servicios de Limpieza" },
        { name: "Innovación y Desarrollo" },
        { name: "Gastos Administrativos" },
        { name: "otros" }
    ];

    await prisma.costType.createMany({
        data: costTypeSeedData
    })
}

async function seedVehicleType() {
    const vehicleTypeSeedData = [
        { name: "Camión de Carga" },
        { name: "Furgoneta" },
        { name: "Automóvil" },
        { name: "Motocicleta" },
        { name: "Bicicleta de Reparto" },
        { name: "Triciclo de Carga" },
        { name: "Barco de Carga" },
        { name: "Dron de Entrega" },
        { name: "Tren de Carga" },
        { name: "Avión de Carga" },
        { name: "Transporte Ferroviario" },
        { name: "Vehículo Eléctrico" },
        { name: "Transporte Público" },
        { name: "Vehículo de Mensajería" },
        { name: "Vehículo de Pasajeros" },
        { name: "Otros" },
    ];

    await prisma.vehicleType.createMany({
        data: vehicleTypeSeedData
    })
}

async function seedJobType() {
    const jobTypeSeedData = [
        { name: "Administrativo", description: "Tareas administrativas y de oficina." },
        { name: "Logística", description: "Gestión de la cadena de suministro y logística." },
        { name: "Conductor de Reparto", description: "Conducción y entrega de paquetes." },
        { name: "Mensajero", description: "Entrega de mensajes y documentos." },
        { name: "Almacén", description: "Gestión de inventario y almacén." },
        { name: "Servicio al Cliente", description: "Atención al cliente y soporte." },
        { name: "Técnico de Mantenimiento", description: "Mantenimiento y reparación de equipos." },
        { name: "Contabilidad", description: "Gestión financiera y contabilidad." },
        { name: "Ventas y Marketing", description: "Ventas y estrategias de marketing." },
        { name: "Recursos Humanos", description: "Gestión de personal y recursos humanos." },
        // Agrega más datos de prueba según sea necesario
    ];

    await prisma.jobType.createMany({
        data: jobTypeSeedData
    })
}
  
seedOrderStatus()
seedCostType()
seedJobType()
seedVehicleType()
