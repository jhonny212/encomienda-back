import { Router, Request, Response } from 'express';
import {
    getBranches,
    createBranch,updateBranch
} from '../database/roadRepository'
import { GetResponsePaginated } from '../utils/crud';
import { prisma } from '../models/database';

export const branchRouter = Router();

//Get Branches
branchRouter.get('', async (req:Request, res:Response) => {
    try{
        const result = await getBranches(req)
        return res.status(200).json(await GetResponsePaginated(prisma.branchOffice,result))
    }catch(err){
        return res.status(500)
    }
})

//Create Branch
branchRouter.post('', async (req:Request, res:Response) => {
    try{
        const result = await createBranch(req)
        return res.status(200).json(result)
    }catch(err){
        return res.status(500)
    }
})

//Update Branch
branchRouter.put('', async (req:Request, res:Response) => {
    try{
        const result = await updateBranch(req)
        return res.status(200).json(result)
    }catch(err){
        return res.status(500)
    }
})