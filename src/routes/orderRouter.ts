import { Router, Request, Response } from 'express';
import {
    getOrderById,getOrders,
    crearOrder
} from '../database/orderRepository'
import { prisma } from '../models/database';
import { GetResponsePaginated } from '../utils/crud';

export const orderRouter = Router();

//Orders
orderRouter.get('/:id',async (req:Request, res: Response) => {
    try {
        const id = Number(req.params.id)
        const result = await getOrderById(req,id)
        return res.status(200).json(result)
    } catch (error) {
        return res.status(500)
    }
})

orderRouter.get('',async (req:Request, res: Response) => {
    try {
        const result = await getOrders(req)
        return res.status(200).json(await GetResponsePaginated(prisma.order,result))
    } catch (error) {
        return res.status(500)
    }
})

orderRouter.post('', async (req:Request, res: Response) => {
    try {
        const result = await crearOrder(req)
        return res.status(200).json(result)
    } catch (error) {
        return res.status(500)
    }
})
