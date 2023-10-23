import { Router, Request, Response } from 'express';
import {
    getBranches,getCities,getDepartments,getPaths,getRoutes,
    createBranch,createPath,createRoute,updateBranch,updateRoute,updatePath
} from '../database/roadRepository'

const road = Router();

//Get Branches
road.get('/branch', async (req:Request, res:Response) => {
    try{
        const pageSize = Number(req.query.pageSize)
        const result = await getBranches(pageSize)
        return res.status(200).json(result)
    }catch(err){
        return res.status(500)
    }
})

//Create Branch
road.post('/branch', async (req:Request, res:Response) => {
    try{
        const result = await createBranch(req)
        return res.status(200).json(result)
    }catch(err){
        return res.status(500)
    }
})

//Update Branch
road.put('/branch', async (req:Request, res:Response) => {
    try{
        const result = await updateBranch(req)
        return res.status(200).json(result)
    }catch(err){
        return res.status(500)
    }
})

//Get routes
road.get('/route', async (req:Request, res:Response) =>{
    try {
        const pageSize = Number(req.query.pageSize)
        const result = await getRoutes(pageSize)
        return res.status(200).json(result)
    } catch (error) {
        return res.status(500)
    }
})

//Create route
road.get('/route', async (req:Request, res:Response) =>{
    try {
        const result = await createRoute(req)
        return res.status(200).json(result)
    } catch (error) {
        return res.status(500)
    }
})

//Update route
road.get('/route', async (req:Request, res:Response) =>{
    try {
        const result = await updateRoute(req)
        return res.status(200).json(result)
    } catch (error) {
        return res.status(500)
    }
})

//Get path
road.get('/path', async (req:Request, res:Response) =>{
    try {
        const pageSize = Number(req.query.pageSize)
        const result = await getPaths(pageSize)
        return res.status(200).json(result)
    } catch (error) {
        return res.status(500)
    }
})

//Create path
road.get('/path', async (req:Request, res:Response) =>{
    try {
        const result = await createPath(req)
        return res.status(200).json(result)
    } catch (error) {
        return res.status(500)
    }
})

//Update route
road.get('/path', async (req:Request, res:Response) =>{
    try {
        const result = await updatePath(req)
        return res.status(200).json(result)
    } catch (error) {
        return res.status(500)
    }
})


//Get cities
road.get('/city', async (req:Request, res:Response) =>{
    try {
        const pageSize = Number(req.query.pageSize)
        const result = await getCities(pageSize)
        return res.status(200).json(result)
    } catch (error) {
        return res.status(500)
    }
})

//Get departments
road.get('/department', async (req:Request, res:Response) =>{
    try {
        const pageSize = Number(req.query.pageSize)
        const result = await getDepartments(pageSize)
        return res.status(200).json(result)
    } catch (error) {
        return res.status(500)
    }
})