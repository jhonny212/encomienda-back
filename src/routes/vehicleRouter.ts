import { Router, Request, Response } from 'express';
import {
    createVehicle,updateVehicle,getVehicles,
    createVehicleType,updateVehicleType,getVehicleTypes,
    deleteVehicle,deleteVehicleType
} from '../database/vehicleRepository'
import { prisma } from '../models/database';
import { GetResponsePaginated } from '../utils/crud';

export const vehicleRouter = Router();

vehicleRouter.delete('', async (req:Request, res:Response) =>{
    try{
        const result = await deleteVehicle(req,res)
        return res.status(200).json(result)
    }catch(err){
        return res.status(500).json(err)
    }
})

vehicleRouter.get('',async (req:Request, res:Response) => {
    try {
        const result = await getVehicles(req)
        return res.status(200).json(await GetResponsePaginated(prisma.vehicle,result))
    } catch (error) {
        return res.status(500).json(error)
    }
})

vehicleRouter.post('', async (req:Request, res:Response) => {
    try {
        const result = await createVehicle(req)
        return res.status(200).json(result)
    } catch (error) {
        return res.status(500).json(error)
    }
})

vehicleRouter.put('',async (req:Request,res: Response) => {
    try {
        const result = await updateVehicle(req)
        return res.status(200).json(result)
    } catch (error) {
        return res.status(500).json(error)
    }
})


vehicleRouter.get('/type',async (req:Request, res:Response) => {
    try {
        const result = await getVehicleTypes(req)
        return res.status(200).json(await GetResponsePaginated(prisma.vehicleType,result))
    } catch (error) {
        return res.status(500).json(error)
    }
})

vehicleRouter.post('/type',async (req:Request, res: Response) => {
    try {
        const result = await createVehicleType(req)
        return res.status(200).json(result)
    } catch (error) {
        return res.status(500).json(error)
    }
})

vehicleRouter.put('/type',async (req:Request, res:Response)=>{
    try {
        const result = await updateVehicleType(req)
        return res.status(200).json(result)
    } catch (error) {
        return res.status(500).json(error)
    }
})

vehicleRouter.delete('/type', async (req:Request, res:Response) =>{
    try{
        const result = await deleteVehicle(req,res)
        return res.status(200).json(result)
    }catch(err){
        return res.status(500).json(err)
    }
})