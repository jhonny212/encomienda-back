import { Request, Response } from 'express';
import {prisma} from '../models/database'
import { paginator } from '../utils/paginator';

export const getAlllCostType =  async (req: Request) => {
    const options = paginator(req)
    return prisma.costType.findMany({
        ...options,
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

export const getAlllCost = async (req: Request) => {
    const options = paginator(req)
    return prisma.cost.findMany({
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