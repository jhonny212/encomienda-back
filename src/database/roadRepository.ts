import { Request, Response } from 'express';
import {prisma} from '../models/database'
import {paginator} from '../utils/pagination';
import { updateCleaner } from '../utils/crud';

/**
 * Exclude the creating of department and city
 */

/**
 * Get of models
 */
const getBranches = () => (pageSize: number, filters: {} = {})=>{
    return prisma.branchOffice.findMany(paginator(pageSize))
}

const getCities = () => (pageSize: number, filters: {} = {})=>{
    return prisma.city.findMany(paginator(pageSize))
}

const getDepartments= () => (pageSize: number, filters: {} = {})=>{
    return prisma.department.findMany(paginator(pageSize))
}

const getPaths= () => (pageSize: number, filters: {} = {})=>{
    return prisma.path.findMany(paginator(pageSize))
}

const getRoutes= () => (pageSize: number, filters: {} = {})=>{
    return prisma.route.findMany(paginator(pageSize))
}


/**
 * Create models
 */
const createBranch = (req: Request) =>{
    const body = req.body as BranchOfficeRequest
    return prisma.branchOffice.create({
        data: {
            ...body
        }
    })
}

const createPath = (req: Request) => {
    const body = req.body as PathRequest
    return prisma.path.create({
        data: {
            ...body
        }
    })
}

const createRoute = (req: Request) => {
    const body = req.body as RouteRequest
    return prisma.route.create({
        data: {...body}
    })
}

/**
 * update models
 */

const updateBranch = (req: Request) =>{
    const [pk, newdata ]= updateCleaner(req,"id")
    const data = newdata as BranchOfficeRequest
    return prisma.branchOffice.update({
        data,
        where: {
            id: pk
        }
    })
}

const updatePath = (req: Request) =>{
    const [pk, newdata ]= updateCleaner(req,"id")
    const data = newdata as PathRequest
    return prisma.path.update({
        data,
        where: {
            id: pk
        }
    })
}

const updateRoute = (req: Request) =>{
    const [pk, newdata ]= updateCleaner(req,"id")
    const data = newdata as RouteRequest
    return prisma.route.update({
        data,
        where: {
            id: pk
        }
    })
}

export const endpoints = {
    getBranches,getCities,getDepartments,getPaths,getRoutes,
    createBranch,createPath,createRoute,
    updateBranch,updatePath,updateRoute
}