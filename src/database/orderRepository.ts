import { Request, Response } from 'express';
import {prisma} from '../models/database'
import {paginator} from '../utils/paginator';
import {getRoutes} from './roadRepository'

//Package crud
export const getPackages = async (req: Request) => {
    return prisma.package.findMany(paginator(req))
}

export const getPackagesByOrder = async (req: Request,orderId: number) => {
    const whereClause = {
        where: {
            orderId
        }
    }
    return prisma.package.findMany(paginator(req,whereClause))
}


//OrderCrud
export const getOrderById =async (req: Request,id: number) => {
    const whereClause = {
        where: {
            id
        }
    }
    return prisma.order.findFirst({
        ...paginator(req,whereClause),
        include: {
            brachOffice: true,
            orderStatus: true,
            Package: true,
            route: true
        }
    })
}

export const getOrders = async (req: Request) => {
    return prisma.order.findMany({
        ...paginator(req),
        include: {
            brachOffice: true,
            orderStatus: true,
            Package: true,
            route: true
        }
    })
}

export const crearOrder = async (req:Request) => {
    const order = req.body as OrderRequest
    
    const routeCost = order.route?.reduce((prev, curr:RouteRequest) => prev + (curr.costWeight || 0), 0);
    const priceCost = order.route?.reduce((prev, curr:RouteRequest) => prev + (curr.priceWeight || 0), 0);

    /**
     * Set cost and price for each package
     */
    let packages = order.packages?.map((p)=>{
        return {
            ...p,
            cost: p.weight * (routeCost || 0),
            total: p.weight * (priceCost || 0)
        }
    })

    /**
     * Get total cost and total price
     */
    const total = packages?.reduce((prev, curr:PackageRequest) => prev + (curr.total || 0), 0);
    const cost = packages?.reduce((prev, curr:PackageRequest) => prev + (curr.cost || 0), 0);

    /**
     * Create order
     */
    delete order["id"]
    delete order["packages"]
    const orderData  = {
        ...order,
        orderStatusId: 1,
        brachOfficeId: order.brachOfficeId,
        //routeId: route.id,
        total: total || 0,
        cost: cost || 0,
    }

    
    // const orderInstance = await prisma.order.create({
    //     data: {
    //         ...orderData,
    //     }
    // })

    // /**
    //  * Create packages
    //  */
    // let data = packages?.map((p)=>{
    //     return  {
    //         ...p,
    //         orderId: orderInstance.id
    //     } as any
    // })

    // console.log(data);
    
    // return prisma.package.createMany({
    //     data: data || []
    // })
}

