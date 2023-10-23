import { Request, Response } from 'express';
import {prisma} from '../models/database'
import {paginator} from '../utils/paginator';
import { updateCleaner } from '../utils/crud';

/**
 * Exclude the creating of department and city
 */

/**
 * Get of models
 */
export const getBranches = async (pageSize: number)=>{
    return prisma.branchOffice.findMany(paginator(pageSize))
}

export const getCities = async (pageSize: number, filters: {} = {})=>{
    return prisma.city.findMany(paginator(pageSize,filters))
}

export const getDepartments= async  (pageSize: number, filters: {} = {})=>{
    return prisma.department.findMany(paginator(pageSize,filters))
}

export const getPaths= async  (pageSize: number, filters: {} = {})=>{
    return prisma.path.findMany(paginator(pageSize,filters))
}

export const getRoutes= async (pageSize: number, filters: {} = {})=>{
    return prisma.route.findMany(paginator(pageSize,filters))
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

export const createPath = async  (req: Request) => {
    const body = req.body as PathRequest
    return prisma.path.create({
        data: {
            ...body
        }
    })
}

export const createRoute = async  (req: Request) => {
    const body = req.body as RouteRequest
    return prisma.route.create({
        data: {...body}
    })
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

export const updatePath = async  (req: Request) =>{
    const [pk, newdata ]= updateCleaner(req,"id")
    const data = newdata as PathRequest
    return prisma.path.update({
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
