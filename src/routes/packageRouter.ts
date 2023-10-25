import { Router, Request, Response } from 'express';
import {
   getPackages,getPackagesByOrder
} from '../database/orderRepository'

export const packageRouter = Router();

//Orders
packageRouter.get('/:order',async (req:Request, res: Response) => {
    try {
        const id = Number(req.params.order)
        const result = await getPackagesByOrder(req,id)
        return res.status(200).json(result)
    } catch (error) {
        return res.status(500)
    }
})

packageRouter.get('',async (req:Request, res: Response) => {
    try {
        const result = await getPackages(req)
        return res.status(200).json(result)
    } catch (error) {
        return res.status(500)
    }
})
