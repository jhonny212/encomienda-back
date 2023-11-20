import { getBranchById } from "../../database/roadRepository"
import { OrderStatus } from "../../enum/enums"
import { prisma } from "../../models/database"

const getGoals = async () => {
    return prisma.order.groupBy({
        by: ['brachOfficeId'],
        _count: {
            _all: true
        },
        where: {
            orderStatusId: OrderStatus.DELIVERED,
        }
    })
}

const getMovements = async (filter: {}) => {
    return prisma.cost.groupBy({
        by: ['branchOfficeId','costTypeId'],
        _sum: {
            estimatedCost: true,
            finalCost: true,
        },
        where: {
            ...filter
        }
    })
}

const getMovementsVehicle = async (filter: {}) => {
    return prisma.vehicle.groupBy({
        by: ['branchOfficeId','vehicleTypeId'],
        _sum: {
            priceWeight: true,
        },
        where: {
            ...filter,
        }
    })
}

export const getMovementsByBranch = async (id: number) => {
    const filter = { branchOfficeId: id }
    const data = (await getMovements(filter)).map(el=>{
        return {
            branchOfficeId: el.branchOfficeId,
            Tipo: el.costTypeId,
            "Total estimado": el._sum.estimatedCost,
            "Total real": el._sum.finalCost
        }
    })
    return formatData(data)
}

export const getAllMovements = async () => {
    const data = (await getMovements({})).map(el=>{
        return {
            branchOfficeId: el.branchOfficeId,
            Tipo: el.costTypeId,
            "Total estimado": el._sum.estimatedCost,
            "Total real": el._sum.finalCost
        }
    })
    return formatData(data)
}

export const getMovementsByVehicle = async (id: number) => {
    const filter = { vehicleTypeId: id }
    const data = (await getMovementsVehicle(filter)).map(el=>{
        return {
            brachOfficeId: el.branchOfficeId,
            Tipo: el.vehicleTypeId,
            "Total": el._sum.priceWeight,
        }
    })
    return formatData(data)
}

export const getVehicleAllMovements = async () => {
    const data =  (await getMovementsVehicle({})).map(el=>{
        return {
            brachOfficeId: el.branchOfficeId,
            Tipo: el.vehicleTypeId,
            "Total": el._sum.priceWeight,
        }
    })
    return formatData(data)
}
async function formatData(data: any) {
    const newData = []
    for( const el of data ){
        let b = (await getBranchById(el.brachOfficeId))[0]
        newData.push({
            sucursal: b.address,
            ...el
        })
    }
    return newData;
}

export const getAllGoals = async () => {
    const goals = (await getGoals()).map(el=>{
        return {
            total: el._count._all,
            brachOfficeId: el.brachOfficeId
        }
    })
    return formatData(goals)
}