import { Router, Request, Response } from 'express';
import {
   getPackages,getPackagesByOrder
} from '../database/orderRepository'
import { prisma } from '../models/database';
import { GetResponsePaginated } from '../utils/crud';

export const packageRouter = Router();

//Orders
packageRouter.get('/:order',async (req:Request, res: Response) => {
    try {
        const id = Number(req.params.order)
        const result = await getPackagesByOrder(req,id)
        return res.status(200).json(await GetResponsePaginated(prisma.package,result))
    } catch (error) {
        return res.status(500).json(error)
    }
})

packageRouter.get('',async (req:Request, res: Response) => {
    try {
        const result = await getPackages(req)
        return res.status(200).json(await GetResponsePaginated(prisma.package,result))
    } catch (error) {
        return res.status(500).json(error)
    }
})
