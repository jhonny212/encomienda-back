import { Router, Request, Response } from 'express';
import {
    getBranches,getCities,getDepartments,getPaths,getRoutes,
    createBranch,createPath,createRoute,updateBranch,updateRoute,updatePath
} from '../database/roadRepository'
import { GetResponsePaginated } from '../utils/crud';
import { prisma } from '../models/database';

export const roadRouter = Router();


//Get routes
roadRouter.get('', async (req:Request, res:Response) =>{
    try {
        const result = await getRoutes(req)
        return res.status(200).json(await GetResponsePaginated(prisma.route,result))
    } catch (error) {
        return res.status(500).json(error)
    }
})

//Create route
roadRouter.post('', async (req:Request, res:Response) =>{
    try {
        console.log(req.body);
        
        const result = await createRoute(req)
        console.log(result);
        
        return res.status(200).json(result)
    } catch (error) {
        return res.status(500).json(error)
    }
})

//Update route
roadRouter.put('', async (req:Request, res:Response) =>{
    try {
        const result = await updateRoute(req)
        return res.status(200).json(result)
    } catch (error) {
        return res.status(500).json(error)
    }
})




//Get cities
roadRouter.get('/city', async (req:Request, res:Response) =>{
    try {
        const result = await getCities(req)
        return res.status(200).json(await GetResponsePaginated(prisma.city,result))
    } catch (error) {
        return res.status(500).json(error)
    }
})

//Get departments
roadRouter.get('/department', async (req:Request, res:Response) =>{
    try {
        const result = await getDepartments(req)
        return res.status(200).json(await GetResponsePaginated(prisma.department,result))
    } catch (error) {
        return res.status(500).json(error)
    }
})