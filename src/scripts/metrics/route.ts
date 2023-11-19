import { OrderStatus } from "../../enum/enums"
import { prisma } from "../../models/database"

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
        
    })
}