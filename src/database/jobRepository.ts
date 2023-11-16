import { Request, Response } from 'express';
import {prisma} from '../models/database'
import { paginator } from '../utils/paginator';
import { removeEntity } from '../utils/crud';



export const getAllJobs = async (req: Request, res: Response) => {
    const options = paginator(req)
    return prisma.job.findMany({
        ...options,
        where:{
            jobType: {
                isActive: true
            }
        },
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

export const getJobById = async (id:number) => {
    return prisma.job.findFirst({
        where: {
            id
        }
    })
}

export const deleteJob = async (req: Request, res: Response) => {
    const { id } = req.body
    return removeEntity(prisma.job,id) 
}