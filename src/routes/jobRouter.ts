import { Router, Request, Response } from 'express';
import {endpoints} from '../database/jobRepository'

const routerJob = Router();

routerJob.post('', async (req:Request, res:Response) => {
    try {
        const result = await endpoints.createJob(req,res);
        return res.status(200).json(result);
    } catch (error) {
        return res.status(500)
    }
})

routerJob.get('', async (req:Request, res:Response) => {
    try {
        const result = await endpoints.getAllJobs(req,res)
        return res.status(200).json(result)
    } catch (error) {
        return res.status(500)
    }
})

export default routerJob;