import { getBranchById } from "../../database/roadRepository";
import { OrderStatus } from "../../enum/enums"
import { prisma } from "../../models/database"
import dotenv from 'dotenv';

dotenv.config();
const error_rate = Number(process.env.ERROR_RATE);

const getTracking = async ()=> {
    const sql = `SELECT
        "brachOfficeId",
        "originId",
        SUM(CASE WHEN "passed" THEN 1 ELSE 0 END) AS "passedTrack",
        SUM(CASE WHEN "passed" = false THEN 1 ELSE 0 END) AS "unpassedTrack"
    FROM "Tracking"
    INNER JOIN "Order" ON "Order"."id" = "Tracking"."orderId"
    GROUP BY "Order"."brachOfficeId", "Order"."originId";`
    return prisma.$queryRawUnsafe<routeMetric[]>(sql)
}

export const routeMetric = async () => {
    const tracking = await getTracking()
    const newData = tracking.map(el => {
        return {
            ...el, 
            errorRate: el.unpassedTrack / (el.unpassedTrack + el.passedTrack)
        }        
    }).filter(el=> el.errorRate < error_rate)
    const dataX = newData.map(async (el)=> {
        const origin = (await getBranchById(el?.originId || -1))[0]
        const destiny = (await getBranchById(el?.brachOfficeId || -1))[0]
        return `${origin.city.name} - ${destiny.city.name}`
    })

    const dataY = newData.map(el=>el.errorRate)

    return {
        dataX,
        dataY
    }
}