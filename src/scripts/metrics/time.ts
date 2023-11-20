import { getBranchById } from "../../database/roadRepository"
import { OrderStatus } from "../../enum/enums"
import { prisma } from "../../models/database"

const getOrders = async () => {
    const sql = `SELECT
        o."brachOfficeId",
        o."originId",
        AVG(EXTRACT(EPOCH FROM (o."deliveredDate" - o."date")) / 60) AS "averageTime",
        count(*) as "total"
    FROM
        "Order" o
    WHERE o."orderStatusId" = ${OrderStatus.DELIVERED}
    GROUP BY
    o."brachOfficeId", o."originId" 
    ORDER BY "averageTime" ASC;`
    const data: averageTime[] = await prisma.$queryRawUnsafe(sql)
    return data;
}

async function getDataX(data: averageTime[]) {
    const newData = []
    for( const el of data ){
        const origin = (await getBranchById(el?.originId || -1))[0]
        const destiny = (await getBranchById(el?.brachOfficeId || -1))[0]
        newData.push(`${origin.city.name} - ${destiny.city.name}`)
    }
    return newData;
}


export const timeMetric = async () => {
    const data = await getOrders()
    const dataX = await getDataX(data)
    const dataY = data.map(el=>{
        return el.averageTime
    })

    return {
        dataX,
        dataY
    }
}