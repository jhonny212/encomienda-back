import { Router, Request, Response } from 'express';
import {
    getBranches,
    createBranch,updateBranch,
    deleteBranch
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
        return res.status(500).json(err)
    }
})

//Delete Branch
branchRouter.delete('', async (req:Request, res:Response) =>{
    try{
        const result = await deleteBranch(req,res)
        return res.status(200).json(result)
    }catch(err){
        return res.status(500).json(err)
    }
})

//Create Branch
branchRouter.post('', async (req:Request, res:Response) => {
    try{
        const result = await createBranch(req)
        return res.status(200).json(result)
    }catch(err){
        return res.status(500).json(err)
    }
})

//Update Branch
branchRouter.put('', async (req:Request, res:Response) => {
    try{
        const result = await updateBranch(req)
        console.log(result);
        
        return res.status(200).json(result)
    }catch(err){
        return res.status(500).json(err)
    }
})
