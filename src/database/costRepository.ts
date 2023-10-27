import { Request, Response } from 'express';
import {prisma} from '../models/database'
import { paginator } from '../utils/paginator';

export const getAlllCostType = (req: Request) => {
    const options = paginator(req)
    return prisma.costType.findMany({
        ...options,
    })
}

export const createCostType = (req: Request) => {
    const body = req.body as CostTypeRequest
    return prisma.costType.create({
        data: {
            ...body
        }
    })
}

export const getAlllCost = (req: Request) => {
    const options = paginator(req)
    return prisma.cost.findMany({
        ...options,
        include:{
            costType: true
        }
    })
}

export const createCost= (req: Request) => {
    const body = req.body as CostRequest
    return prisma.cost.create({
        data: {
            ...body
        }
    })
}