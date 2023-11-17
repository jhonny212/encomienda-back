import { Request, Response } from 'express';
import { prisma } from '../models/database'
import { paginator } from '../utils/paginator';



export const getLogsByOrder = async (orderId: number, order: orderType, take: number) => {
    return prisma.log.findMany({
        take,
        where: {
            orderId,
        },
        orderBy: {
            id: order.type
        },
        select: {
            route: true
        }
    })
}

export const createNewLog = async (log: LogRequest) => {
    return prisma.log.create({
        data: log
    })
}

export const getCosts = async () => {
    return prisma.$queryRaw`SELECT
        o.branchId,
        SUM(l.cost) AS totalCost
    FROM
        "Order" o
    JOIN
        "Log" l ON o.id = l.orderId
    GROUP BY
        o.branchId, o.brachOfficeId;`
}