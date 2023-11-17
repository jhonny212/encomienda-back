import { getCosts } from "../database/logRepository"
import { prisma } from "../models/database"

const metric = {
    ganancia: 1,
    paquetes: 2,
    viabilidad: 3
}

const getOrders =async () => {
    return prisma.order.groupBy({
        by: ['brachOfficeId', 'routeId'],
        _sum: {
            total: true,
        },
        orderBy: {
            _sum: {
                total: 'desc'
            }
        },
    })
}

export const gainMetric = async () => {
    const income = await getOrders()
    const costs = await getCosts()
    console.log(costs);
    
    

}