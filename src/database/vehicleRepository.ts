import { Request, Response } from 'express';
import {prisma} from '../models/database'
import {paginator} from '../utils/paginator';
import { removeEntity, updateCleaner } from '../utils/crud';


//CRUD VehicleType
export const getVehicleTypes = (req: Request)=>{
    return prisma.vehicleType.findMany({
        ...paginator(req),
        where: {
            isActive: true
        }
    })
}

export const createVehicleType = (req: Request) => {
    const body = req.body as VehicleTypeRequest
    return prisma.vehicleType.create({
        data: {
            ...body
        }
    })
}

export const updateVehicleType = (req: Request)=>{
    const [pk, newdata ]= updateCleaner(req,"id")
    const data = newdata as VehicleTypeRequest
    return prisma.vehicleType.update({
        data,
        where: {
            id: pk
        }
    })
}

export const deleteVehicleType = async (req: Request, res: Response) => {
    const { id } = req.body
    return removeEntity(prisma.vehicleType,id) 
}

//CRUD Vehicle
export const getVehicles = (req: Request)=>{
    return prisma.vehicle.findMany({
        ...paginator(req),
        include: {
            vehicleType: true,
            branchOffice: true
        },
        where: {
            isActive: true,
            vehicleType: {
                isActive: true
            }
        }
    })
}

export const createVehicle = (req: Request) => {
    const body = req.body as VehicleRequest
    return prisma.vehicle.create({
        data: {
            ...body
        }
    })
}

export const updateVehicle = (req: Request)=>{
    const [pk, newdata ]= updateCleaner(req,"id")
    const data = newdata as VehicleRequest
    return prisma.vehicle.update({
        data,
        where: {
            id: pk
        }
    })
}

export const deleteVehicle = async (req: Request, res: Response) => {
    const { id } = req.body
    return removeEntity(prisma.vehicle,id) 
}


export const filterVehicle = (where = {}) => {
    return prisma.vehicle.findMany({
        where
    })
}
