import { Request, Response } from 'express';
import {prisma} from '../models/database'
import { paginator } from '../utils/paginator';
import { removeEntity } from '../utils/crud';


export const getAllTypeJobs = async (req: Request, res: Response, pageSize: number = 0) => {
    const options = paginator(req)
    return prisma.jobType.findMany({
        ...options,
        where: {
            isActive: true
        }
    })
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

export const deleteJobType = async (req: Request, res: Response) => {
    const { id } = req.body
    return removeEntity(prisma.jobType,id) 
}