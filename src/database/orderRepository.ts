import { Request, Response } from 'express';
import {prisma} from '../models/database'
import {paginator} from '../utils/paginator';
import { updateCleaner } from '../utils/crud';
import {getRoutes} from './roadRepository'

//Package crud
export const getPackages = async (req: Request) => {
    return prisma.package.findMany(paginator(req))
}

export const getPackagesByOrder = async (req: Request) => {
    const orderId = req.query.orderId
    const whereClause = {
        where: {
            orderId
        }
    }
    return prisma.package.findMany(paginator(req,whereClause))
}


//OrderCrud
export const getOrderById =async (req: Request) => {
    const id = req.query.id
    const whereClause = {
        where: {
            id
        }
    }
    return prisma.order.findMany({
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

    /**
     * Get route for values to calculate prices
     */
    const route = (
        await getRoutes(req,{
            where: {id: order.routeId}
        })
    )[0]

    /**
     * Set cost and price for each package
     */
    let packages = order.packages.map((p)=>{
        return {
            ...p,
            cost: p.weight * route.costWeight,
            total: p.weight * route.priceWeight
        }
    })

    /**
     * Get total cost and total price
     */
    const total = packages.reduce((prev, curr:PackageRequest) => prev + (curr.total || 0), 0);
    const cost = packages.reduce((prev, curr:PackageRequest) => prev + (curr.cost || 0), 0);

    /**
     * Create order
     */
    delete order["id"]
    const orderInstance = await prisma.order.create({
        data: {
            ...order,
            orderStatusId: 0,
            routeId: route.id,
            total,
            cost
        }
    })

    /**
     * Create packages
     */
    let data = packages.map((p)=>{
        return  {
            ...p,
            orderId: orderInstance.id
        } as any
    })
    return prisma.package.createMany({
        data
    })
}

