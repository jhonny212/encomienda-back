import { Router, Request, Response } from 'express';
import { getPath } from '../database/trackingRepository'
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

