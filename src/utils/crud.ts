import { Request, Response } from 'express';
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