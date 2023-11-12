import { Request, Response } from 'express';
import {prisma} from '../models/database'
import {paginator} from '../utils/paginator';
import { updateCleaner } from '../utils/crud';
import {getAllRoutes,getBestPath} from '../scripts/bestRoute'

export const moveOrder =async (req:Request) => {

    const getTrack = (id:number, passed:boolean)=>{
        return prisma.tracking.findFirst({
            where: {
                id,
                passed
            },
            orderBy: {
                id: 'asc'
            },
            select: {
                track: true,
                id: true,
                passed: true
            }
        })
    }

    const {id} = req.body

    const actualTrack = await getTrack(id,true)
    const nextTrack = await getTrack(id,false)

    if(nextTrack?.track.isActive && actualTrack?.passed){
        const result = await prisma.tracking.update({
            data: {
                passed: true
            },
            where: {
                id: nextTrack?.id
            }
        })
        return result
    }
    
    return {}
    
}

export const assignVehicle = async (routeId: number)=>{
    const vehicleAmount = prisma.tracking.count({
        where: {
            trackId: routeId,
        }
    })
}


export const updateStatusOrder = async (req:Request) => {}

export const generateQrCode = async (req:Request) => {}

export const getTracking = async (req:Request) => {}

export const getPath =async (req:Request) => {
    const best = req.body.best
    if(best){
        return getBestPath(req.body.origin,req.body.destiny)
    }else{
        return getAllRoutes(req.body.origin,req.body.destiny)
    }
}