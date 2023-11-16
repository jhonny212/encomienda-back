import { Router, Request, Response } from 'express';
import {
    getCities,getDepartments,getRoutes,
    createRoute,updateRoute,deleteCity,deleteDepartment,deleteRoute
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
        const result = await createRoute(req)
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

roadRouter.delete('', async (req:Request, res:Response) =>{
    try{
        const result = await deleteRoute(req,res)
        return res.status(200).json(result)
    }catch(err){
        return res.status(500).json(err)
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

roadRouter.delete('/city', async (req:Request, res:Response) =>{
    try{
        const result = await deleteCity(req,res)
        return res.status(200).json(result)
    }catch(err){
        return res.status(500).json(err)
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

roadRouter.delete('/department', async (req:Request, res:Response) =>{
    try{
        const result = await deleteDepartment(req,res)
        return res.status(200).json(result)
    }catch(err){
        return res.status(500).json(err)
    }
})