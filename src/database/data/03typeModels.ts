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


seedOrderStatus()
