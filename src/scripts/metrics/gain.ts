import { getCosts } from "../../database/logRepository"
import { getBranchById } from "../../database/roadRepository";
import { OrderStatus } from "../../enum/enums"
import { prisma } from "../../models/database"
import dotenv from 'dotenv';

dotenv.config();
const success_rate = Number(process.env.SUCCESS_RATE);


const getOrders = async () => {
    return prisma.order.groupBy({
        by: ['brachOfficeId', "originId"],
        _sum: {
            total: true,
            cost: true,
        },
        orderBy: [
            { brachOfficeId: 'asc' },
            { originId: 'asc' }
        ],
        where: {
            orderStatusId: OrderStatus.DELIVERED,
        }
    })
}

function getRate(el: any) {
    const total = el._sum.total || 0
    const cost = el._sum.cost || 0
    const rate = ((total - cost) / total) * 100
    return rate
}

async function getDataX(data: any[]) {
    const newData = []
    for( const el of data ){
        const origin = (await getBranchById(el?.originId || -1))[0]
        const destiny = (await getBranchById(el?.brachOfficeId || -1))[0]
        newData.push(`${origin.city.name} - ${destiny.city.name}`)
    }
    return newData;
}

export const gainMetric = async () => {
    
    const income = (await getOrders()).map(el => {
        const rate = getRate(el)
        return { ...el, rate }
    })
   
    const filteredIncome = income.filter(el => el.rate < success_rate)
    const costs = await getCosts(filteredIncome)
   
    const newData = filteredIncome.map((el,index)=>{
        el._sum.cost = costs[index].totalcost
        const rate = getRate(el)
        return {
            ...el,rate
        }
    }).filter(el => el.rate < success_rate)
    
    const dataX = await getDataX(newData)
    const dataY = newData.map(el=>el.rate)
    return {
        dataX,
        dataY
    }
}

