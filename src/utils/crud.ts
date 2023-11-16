import { Request, Response } from 'express';
import { prisma } from '../models/database';
export const updateCleaner = (req:Request, key: string) => {
    const data = req.body
    const pk = data[key];
    delete data[key];
    return [pk,data]
}

export const GetResponsePaginated = async (entity: any, data: any) =>{
    const totalSize = await entity.count()
    return {
        data,
        totalSize
    }
}

export const removeEntity = async (entity: any, id:number) =>{
    return entity.update({
        data: {
            isActive: false
        },
        where: {
            id
        }
    })
}

export const deleteEntity = async (entity: any, id:number) =>{
    return prisma.city.delete({
        where: {id}
    })
}