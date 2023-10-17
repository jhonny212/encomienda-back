import { Request, Response } from 'express';
import {prisma} from '../models/database'
import { paginator } from '../utils/pagination';


const getAllJobs = async (req: Request, res: Response, pageSize: number = 0) => {
    return prisma.job.findMany(paginator(pageSize))
}

//Creates
const createJob = async (req: Request, res: Response) => {
    const body = req.body as JobRequest
    return prisma.job.create({
        data: {
            ...body
        }
    })
}

export const endpoints = {
    createJob,
    getAllJobs
}