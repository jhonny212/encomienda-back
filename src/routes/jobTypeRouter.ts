import { Router, Request, Response } from 'express';
import {endpoints} from '../database/jobTypeRepository'

const routerJobType = Router();

routerJobType.post('', async (req:Request, res:Response) => {
    try {
        const result = await endpoints.createJobType(req,res);
        return res.status(200).json(result);
    } catch (error) {
        return res.status(500)
    }
})

routerJobType.get('', async (req:Request, res:Response) => {
    try {
        const result = await endpoints.getAllTypeJobs(req,res)
        return res.status(200).json(result)
    } catch (error) {
        return res.status(500)
    }
})

export default routerJobType;