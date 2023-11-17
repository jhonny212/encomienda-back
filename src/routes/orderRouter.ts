import { Router, Request, Response } from 'express';
import {
    getOrderById,getOrders,
    crearOrder,estimateVehicleCost,deleteOrder, estimateOrderCost
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
        return res.status(500).json(error)
    }
})

orderRouter.get('',async (req:Request, res: Response) => {
    try {
        const result = await getOrders(req)
        return res.status(200).json(await GetResponsePaginated(prisma.order,result))
    } catch (error) {
        return res.status(500).json(error)
    }
})

orderRouter.post('', async (req:Request, res: Response) => {
    try {
        const result = await crearOrder(req)
        return res.status(200).json(result)
    } catch (error) {
        return res.status(500).json(error)
    }
})

orderRouter.post('/estimate', async (req:Request, res: Response) => {
    try {
        const result = await estimateOrderCost(req.body.route as RouteRequest[],req.body.packages as PackageRequest[])
        return res.status(200).json(result)
    } catch (error) {
        return res.status(500).json(error)
    }
})

orderRouter.delete('', async (req:Request, res:Response) =>{
    try{
        const result = await deleteOrder(req,res)
        return res.status(200).json(result)
    }catch(err){
        return res.status(500).json(err)
    }
})