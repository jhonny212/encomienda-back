import { Router, Request, Response } from 'express';
import {createJobType,getAllTypeJobs} from '../database/jobTypeRepository'

const routerJobType = Router();

routerJobType.post('', async (req:Request, res:Response) => {
    try {
        const result = await createJobType(req,res);
        return res.status(200).json(result);
    } catch (error) {
        return res.status(500)
    }
})

routerJobType.get('', async (req:Request, res:Response) => {
    try {
        const result = await getAllTypeJobs(req,res)
        return res.status(200).json(result)
    } catch (error) {
        return res.status(500)
    }
})

export default routerJobType;