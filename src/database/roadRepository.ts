import { Request, Response } from 'express';
import {prisma} from '../models/database'
import {paginator} from '../utils/paginator';
import { removeEntity, updateCleaner } from '../utils/crud';

/**
 * Exclude the creating of department and city
 */

/**
 * Get of models
 */
export const getBranches = async (req: Request)=>{
    return prisma.branchOffice.findMany({
        ...paginator(req),
        where: {
            isActive: true
        },
        include: {
            city: true,
        }
    })
}

export const getCities = async (req: Request)=>{
    return prisma.city.findMany({
        ...paginator(req),
        where: {
            isActive: true
        },
        include: {
            department: true
        }
    })
}

export const deleteCity = async (req: Request, res: Response) => {
    const { id } = req.body
    return removeEntity(prisma.city,id) 
}

export const getDepartments= async  (req: Request)=>{
    return prisma.department.findMany({
        ...paginator(req),
        where: {
            isActive: true,
        }
    })
}

export const deleteDepartment = async (req: Request, res: Response) => {
    const { id } = req.body
    return removeEntity(prisma.department,id) 
}

export const getRoutes= async (req: Request, filters: {} = {})=>{
    return prisma.route.findMany({
        ...paginator(req),
        where: {
          ...filters,
          isActive: true  
        },
        include: {
            origin: true,
            destination: true
        }
    })
}


/**
 * Create models
 */
export const createBranch = async  (req: Request) =>{
    const body = req.body as BranchOfficeRequest
    return prisma.branchOffice.create({
        data: {
            ...body
        }
    })
}

export const deleteBranch = async (req: Request, res: Response) => {
    const { id } = req.body
    return removeEntity(prisma.branchOffice,id) 
}



export const createRoute = async  (req: Request) => {
    const body = req.body as RouteRequest
    return prisma.route.create({
        data: {...body}
    })
}

export const deleteRoute = async (req: Request, res: Response) => {
    const { id } = req.body
    return removeEntity(prisma.route,id) 
}


/**
 * update models
 */

export const updateBranch = async  (req: Request) =>{
    const [pk, newdata ]= updateCleaner(req,"id")
    const data = newdata as BranchOfficeRequest
    
    return prisma.branchOffice.update({
        data,
        where: {
            id: pk
        }
    })
}


export const updateRoute = async  (req: Request) =>{
    const [pk, newdata ]= updateCleaner(req,"id")
    const data = newdata as RouteRequest
    return prisma.route.update({
        data,
        where: {
            id: pk
        }
    })
}
