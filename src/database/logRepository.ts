import { Request, Response } from 'express';
import { prisma } from '../models/database'
import { paginator } from '../utils/paginator';
import { OrderStatus } from '../enum/enums';



export const getLogsByOrder = async (orderId: number, order: orderType, take: number, passed: boolean = false) => {
    return prisma.log.findMany({
        take,
        where: {
            orderId,
            passed
        },
        orderBy: {
            id: order.type
        },
        select: {
            route: true,
            id: true
        }
    })
}

export const createNewLog = async (log: LogRequest) => {
    return prisma.log.create({
        data: log
    })
}

export const getCosts = async (incomeFiltered: any[] = []) => {
    const branches = "(" + incomeFiltered.map(e => e.brachOfficeId).join(", ") + ")";
    const routes = "(" + incomeFiltered.map(e => e.routeId).join(", ") + ")";
    const sql = `SELECT
        o."brachOfficeId" , o."routeId",
        SUM(l."vehicleCost" + l."cost") AS totalCost
        FROM
            "Order" o
        JOIN
            "Log" l ON o.id = l."orderId"
        WHERE o."orderStatusId"=${OrderStatus.DELIVERED}
        AND o."brachOfficeId" IN ${branches}
        AND o."routeId" IN ${routes}
        GROUP BY
            o."brachOfficeId", o."routeId"
        ORDER BY  o."brachOfficeId" ASC, o."routeId" ASC
            `
    const data = await prisma.$queryRawUnsafe(sql)
    return data as costSum[]
}