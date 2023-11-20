import { prisma } from "../../models/database"

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

export const getMovementsByBranch = async (id: number) => {
    const filter = { branchOfficeId: 1 }
    return (await getMovements(filter)).map(el=>{
        return {
            Sucursal: el.branchOfficeId,
            Tipo: el.costTypeId,
            "Total estimado": el._sum.estimatedCost,
            "Total real": el._sum.finalCost
        }
    })

}

export const getAllMovements = async () => {
    return getMovements({})
}