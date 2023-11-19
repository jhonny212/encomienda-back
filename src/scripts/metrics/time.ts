import { OrderStatus } from "../../enum/enums"
import { prisma } from "../../models/database"

const getOrders = async () => {
    const sql = `SELECT
        o."brachOfficeId",
        o."originId",
        AVG(EXTRACT(EPOCH FROM (o."deliveredDate" - o."date")) / 60) AS averageTime,
        count(*) as total
    FROM
        "Order" o
    WHERE o."orderStatusId" = ${OrderStatus.DELIVERED}
    GROUP BY
    o."brachOfficeId", o."originId" 
    ORDER BY averageTime ASC;`
    const data: averageTime[] = await prisma.$queryRawUnsafe(sql)
    return data;
}



export const timeMetric = async () => {
    return getOrders()
}