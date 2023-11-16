import { Router, Request, Response } from 'express';
import {createJobType,getAllTypeJobs,deleteJobType} from '../database/jobTypeRepository'
import { GetResponsePaginated } from '../utils/crud';
import { prisma } from '../models/database';

export const jobTypeRouter = Router();

jobTypeRouter.delete('', async (req:Request, res:Response) =>{
    try{
        const result = await deleteJobType(req,res)
        return res.status(200).json(result)
    }catch(err){
        return res.status(500).json(err)
    }
})

jobTypeRouter.post('', async (req:Request, res:Response) => {
    try {
        const result = await createJobType(req,res);
        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json(error)
    }
})

jobTypeRouter.get('', async (req:Request, res:Response) => {
    try {
        const result = await getAllTypeJobs(req,res)
        return res.status(200).json(await GetResponsePaginated(prisma.jobType,result))
    } catch (error) {
        return res.status(500).json(error)
    }
})

export default jobTypeRouter;