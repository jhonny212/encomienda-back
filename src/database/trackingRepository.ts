import { Request, Response } from 'express';
import {prisma} from '../models/database'
import {paginator} from '../utils/paginator';
import { updateCleaner } from '../utils/crud';
import {getAllRoutes,getBestPath} from '../scripts/bestRoute'

export const getPath =async (req:Request) => {
    const {origin,destiny, type} = req.body
    if(Number(type) == 1){
        return getBestPath(Number(origin),Number(destiny))
    }else{
        const routes= await getAllRoutes(Number(origin),Number(destiny))
        const sumWeight = (route: RouteRequest[]) => route.reduce((sum, r) => sum + r.weight, 0);
        const sortedRoutes = routes.sort((a, b) => sumWeight(a) - sumWeight(b));
        return sortedRoutes;
    }
}

export const createTracking = async (routes: RouteRequest[], orderId: number, vehicles: any) =>{
    type tracking = {
        routeId: number;
        orderId: number;
        cost: number;
        price: number;
        vechicleCost: number;
    }
    const bulkTracking: tracking[] = []
    routes.forEach(route=>{
        const el: tracking = {
            routeId: route.id || 0,
            cost: route.costWeight,
            price: route.priceWeight,
            orderId,
            vechicleCost: vehicles[route.originId].total
        }
        bulkTracking.push(el);
    })
    prisma.tracking.createMany({
        data: bulkTracking
    })
}



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
                //track: true,
                id: true,
                passed: true
            }
        })
    }

    const {id} = req.body

    const actualTrack = await getTrack(id,true)
    const nextTrack = await getTrack(id,false)

    // if(nextTrack?.track.isActive && actualTrack?.passed){
    //     const result = await prisma.tracking.update({
    //         data: {
    //             passed: true
    //         },
    //         where: {
    //             id: nextTrack?.id
    //         }
    //     })
    //     return result
    // }
    
    return {}
    
}

export const assignVehicle = async (routeId: number)=>{
    const vehicleAmount = prisma.tracking.count({
        where: {
            //trackId: routeId,
        }
    })
}


