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
    const branch = incomeFiltered.map(e => e.brachOfficeId)
    const route = incomeFiltered.map(e => e.originId)
    branch.push(-1)
    route.push(-1)
    const branches = "(" + branch.join(", ") + ")";
    const routes = "(" + route.join(", ") + ")";
    const sql = `SELECT
        o."brachOfficeId" , o."originId",
        SUM(l."vehicleCost" + l."cost") AS totalCost
        FROM
            "Order" o
        JOIN
            "Log" l ON o.id = l."orderId"
        WHERE o."orderStatusId"=${OrderStatus.DELIVERED}
        AND o."brachOfficeId" IN ${branches}
        AND o."originId" IN ${routes}
        GROUP BY
            o."brachOfficeId", o."originId"
        ORDER BY  o."brachOfficeId" ASC, o."originId" ASC
            `
    const data = await prisma.$queryRawUnsafe(sql)
    return data as costSum[]
}