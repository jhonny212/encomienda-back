import { Request, Response } from 'express';
import {prisma} from '../models/database'
import { paginator } from '../utils/paginator';
import { removeEntity,deleteEntity } from '../utils/crud';

export const getAlllCostType =  async (req: Request) => {
    const options = paginator(req)
    return prisma.costType.findMany({
        ...options,
        where: {
            isActive: true
        }
    })
}

export const createCostType = async (req: Request) => {
    const body = req.body as CostTypeRequest
    return prisma.costType.create({
        data: {
            ...body
        }
    })
}

export const deleteCostType = async (req: Request) => {
    const { id } = req.body
    return removeEntity(prisma.costType,id) 
}

export const getAlllCost = async (req: Request) => {
    const options = paginator(req)
    return prisma.cost.findMany({
        where: {
            costType: {
                isActive: true
            }
        },
        ...options,
        include:{
            costType: true,
            branchOffice: true
        }
    })
}

export const createCost= async (req: Request) => {
    const body = req.body as CostRequest
    return prisma.cost.create({
        data: {
            ...body
        }
    })
}

export const deleteCost = async (req: Request) => {
    const { id } = req.body
    return removeEntity(prisma.cost,id)
}