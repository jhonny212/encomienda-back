import { Request, Response } from 'express';
import {prisma} from '../models/database'
import { paginator } from '../utils/pagination';


const getAllTypeJobs = async (req: Request, res: Response, pageSize: number = 0) => {
    return prisma.jobType.findMany(paginator(pageSize))
}

//Creates
const createJobType = async (req: Request, res: Response) => {
    const body = req.body as JobTypeRequest
    return prisma.jobType.create({
        data: {
            ...body
        }
    })
}

export const endpoints = {
    createJobType,
    getAllTypeJobs
}