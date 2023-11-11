import { prisma } from "../models/database"

const metric = {
    ganancia: 1,
    paquetes: 2,
    viabilidad: 3
}

const getOrders =async () => {
    const orders1 = prisma.order.findMany({
        orderBy: {
            total: 'asc'
        },
        select: {
            id: true,
            cost: true,
            total: true,
            brachOfficeId: true,
            routeId: true
        }
    })
}