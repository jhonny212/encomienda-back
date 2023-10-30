import { Router, Request, Response } from 'express';
import {
    getPaths,createPath,updatePath
} from '../database/roadRepository'
import { prisma } from '../models/database';
import { GetResponsePaginated } from '../utils/crud';

export const pathRouter = Router();

//Get path
pathRouter.get('', async (req:Request, res:Response) =>{
    try {
        const result = await getPaths(req)
        return res.status(200).json(await GetResponsePaginated(prisma.path,result))
    } catch (error) {
        return res.status(500)
    }
})

//Create path
pathRouter.post('', async (req:Request, res:Response) =>{
    try {
        const result = await createPath(req)
        return res.status(200).json(result)
    } catch (error) {
        return res.status(500)
    }
})

//Update route
pathRouter.put('', async (req:Request, res:Response) =>{
    try {
        const result = await updatePath(req)
        return res.status(200).json(result)
    } catch (error) {
        return res.status(500)
    }
})