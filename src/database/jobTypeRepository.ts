import { Request, Response } from 'express';
import {prisma} from '../models/database'
import { paginator } from '../utils/paginator';


export const getAllTypeJobs = async (req: Request, res: Response, pageSize: number = 0) => {
    return prisma.jobType.findMany(paginator(req))
}

//Creates
export const createJobType = async (req: Request, res: Response) => {
    const body = req.body as JobTypeRequest
    return prisma.jobType.create({
        data: {
            ...body
        }
    })
}

export const getJobTypeById = async (id:number) => {
    return prisma.jobType.findFirst({
        where: {
            id
        }
    })
}