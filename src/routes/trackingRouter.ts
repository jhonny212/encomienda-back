import { Router, Request, Response } from 'express';
import { getPath,moveOrder,generateQRCode, trackQr } from '../database/trackingRepository'
import { prisma } from '../models/database';
import { GetResponsePaginated } from '../utils/crud';

export const trackingRouter = Router();

trackingRouter.post('/bestRoute',async (req:Request, res:Response) => {
    try{
        const result = await getPath(req)
        return res.status(200).json(result)
    }catch(err){
        return res.status(500).json(err)
    }
})

trackingRouter.put('',async (req:Request, res:Response) => {
    try {
        const result = await moveOrder(req)
        return res.status(200).json(result)
    } catch (error) {
        return res.status(500).json(error)
    }
})

trackingRouter.get('/qr/:orderId',async (req:Request, res:Response) => {
    try {
        const result = await generateQRCode(req)
        return res.status(200).json(result)
    } catch (error) {
        return res.status(500).json(error)
    }
})

trackingRouter.get('/tracking/qr/:orderId',async (req:Request, res:Response) => {
    try {
        const result = await trackQr(req)
        return res.status(200).json(result)
    } catch (error) {
        return res.status(500).json(error)
    }
})