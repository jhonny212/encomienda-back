import { Router, Request, Response } from 'express';
import {
    createCost,createCostType,getAlllCost,getAlllCostType
} from '../database/costRepository'
import { prisma } from '../models/database';
import { GetResponsePaginated } from '../utils/crud';

export const costRouter = Router();

costRouter.get('',async (req:Request,res:Response) => {
    try {
        const result = await getAlllCost(req)
        return res.status(200).json(await GetResponsePaginated(prisma.cost,result));
    } catch (error) {
        return res.status(500).json(error)
    }
})

costRouter.post('',async (req:Request,res:Response) => {
    try {
        const result = await createCost(req)
        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json(error)
    }
})

costRouter.get('/type',async (req:Request,res:Response) => {
    try {
        const result = await getAlllCostType(req)
        return res.status(200).json(await GetResponsePaginated(prisma.costType,result));
    } catch (error) {
        return res.status(500).json(error)
    }
})

costRouter.post('/type',async (req:Request,res:Response) => {
    try {
        const result = await createCostType(req)
        return res.status(200).json(result);
    } catch (error) {
        
    }
})