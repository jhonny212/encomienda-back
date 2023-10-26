import { Request, Response } from 'express';
import {prisma} from '../models/database'
import { paginator } from '../utils/paginator';



export const getAllJobs = async (req: Request, res: Response) => {
    const options = paginator(req)
    return prisma.job.findMany({
        ...options,
        include: {
            jobType: true
        },
    })
}

//Creates
export const createJob = async (req: Request, res: Response) => {
    const body = req.body as JobRequest
    return prisma.job.create({
        data: {
            ...body
        }
    })
}
