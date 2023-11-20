import { Request, Response } from 'express';
import { prisma } from '../models/database'
import { paginator } from '../utils/paginator';
import { getRoutes } from './roadRepository'
import { createTracking } from './trackingRepository';
import { removeEntity } from '../utils/crud';
import { OrderStatus } from '../enum/enums';

//Package crud
export const getPackages = async (req: Request) => {
    return prisma.package.findMany(paginator(req))
}

export const getPackagesByOrder = async (req: Request, orderId: number) => {
    const whereClause = {
        where: {
            orderId
        }
    }
    return prisma.package.findMany({
        ...paginator(req),
        ...whereClause
    })
}

//OrderCrud
export const getOrderById = async (req: Request, id: number) => {
    const whereClause = {
        where: {
            id
        }
    }
    return prisma.order.findFirst({
        ...paginator(req),
        ...whereClause,
        include: {
            brachOffice: true,
            orderStatus: true,
            Package: true,
            route: true,
            origin: true
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

export const updateOrder = async (data: {}, id: number) => {
    return prisma.order.update({
        data: {
            ...data,
        },
        where: {
            id
        }
    })
}

export const deleteOrder = async (req: Request, res: Response) => {
    return updateOrder({ orderStatusId: OrderStatus.CANCELED }, req.body.id)
}


//Order Logic
export const estimateVehicleCost = async (route: RouteRequest[]) => {
    const branchOffices = route?.map(el => el.originId)
    const vehicles = await prisma.vehicle.groupBy(
        {
            by: ['vehicleTypeId', 'branchOfficeId'],
            _avg: {
                priceWeight: true,
            },
            where: {
                branchOfficeId: {
                    in: branchOffices
                }
            }

        }
    )

    const groupedVehicles: any = {}
    vehicles.forEach(el => {
        if (groupedVehicles[el.branchOfficeId] !== undefined) {
            groupedVehicles[el.branchOfficeId].amount += 1
            groupedVehicles[el.branchOfficeId].total += el._avg.priceWeight

        } else {
            groupedVehicles[el.branchOfficeId] = {
                amount: 1,
                total: el._avg.priceWeight
            }
        }
    })
    let estimated = 0
    for (const key in groupedVehicles) {
        const vehicle = groupedVehicles[key]
        estimated += vehicle.total / vehicle.amount
    }
    return { estimated, groupedVehicles };
}

export const estimateOrderCost =async (route: RouteRequest[], packagesData: PackageRequest[]) => {
    /**
     * Get costs and prices based on the selected route
     */
    const routeCost = route?.reduce((prev, curr: RouteRequest) => prev + (curr.costWeight || 0), 0);
    const priceCost = route?.reduce((prev, curr: RouteRequest) => prev + (curr.priceWeight || 0), 0);

    /**
     * Get costs and prices based on a avg of vehicles
     */
    const { estimated, groupedVehicles } = await estimateVehicleCost(route || [])

    /**
     * Set cost and price for each package
     */
    let packages = packagesData?.map((p) => {
        return {
            ...p,
            cost: (p.weight * (routeCost || 0)) + estimated * p.weight,
            total: (p.weight * (priceCost || 0)) + estimated * p.weight
        }
    })

    /**
     * Get total cost and total price
     */
    const total = packages?.reduce((prev, curr: PackageRequest) => prev + (curr.total || 0), 0);
    const cost = packages?.reduce((prev, curr: PackageRequest) => prev + (curr.cost || 0), 0);

    return {total,cost,packages,estimated,priceCost,groupedVehicles}
}

export const crearOrder = async (req: Request) => {
    const order = req.body as OrderRequest

    /**
     * Get costs
     */
    const {cost,total,packages,estimated,groupedVehicles,priceCost} = await estimateOrderCost(order.route || [], order.packages || [])

    /**
     * Create order
     */

    const { email, client, address, phone, description } = order
    const routeId = order.route ? order.route[0].id : 0
    const destiny = order.route ? order.route[order.route.length - 1].destinationId : 0
    const originId = order.route ? order.route[0].originId : 0
    
    const orderData = {
        //Basic info
        email,
        client,
        address,
        phone,
        description,

        //Auto info
        orderStatusId: OrderStatus.PENDING,
        brachOfficeId: destiny,

        routeId,
        total: total || 0,
        cost: cost || 0,
        originId
    }
    
    const orderInstance = await prisma.order.create({
        data: {
            ...orderData,
        }
    })


    /**
     * Create packages
     */
    let data = packages?.map((p) => {
        return {
            ...p,
            orderId: orderInstance.id
        } as any
    })

    await prisma.package.createMany({
        data: data || []
    })

    createTracking(order?.route || [], orderInstance.id, groupedVehicles)
    return {
        data,
        vehiclePriceByWeight: estimated,
        packagePriceByWeight: priceCost
    }
}

export const getOrdersByBranch = (brachOfficeId: number) => {
    return prisma.log.findMany({
        where: {
            route: {
                originId: brachOfficeId
            },
            passed: false
        },
        select: {
            order: {
                select: {
                    address: true,
                    brachOffice: true,
                    client: true,
                    cost: true,
                    date: true,
                    deliveredDate: true,
                    description: true,
                    email: true,
                    id: true,
                    orderStatus: true,
                    origin: true,
                    phone: true,
                    total: true
                }
            }
        }
    })
}