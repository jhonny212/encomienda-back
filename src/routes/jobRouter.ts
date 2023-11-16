import { Router, Request, Response } from 'express';
import {createJob,getAllJobs,deleteJob} from '../database/jobRepository'
import { prisma } from '../models/database';
import { GetResponsePaginated } from '../utils/crud';

export const jobRouter = Router();

jobRouter.post('', async (req:Request, res:Response) => {
    try {
        const result = await createJob(req,res);
        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json(error)
    }
})

jobRouter.delete('', async (req:Request, res:Response) =>{
    try{
        const result = await deleteJob(req,res)
        return res.status(200).json(result)
    }catch(err){
        return res.status(500).json(err)
    }
})


jobRouter.get('', async (req:Request, res:Response) => {
    try {
        const result = await getAllJobs(req,res)
        return res.status(200).json(await GetResponsePaginated(prisma.job,result))
    } catch (error) {
        return res.status(500).json(error)
    }
})
