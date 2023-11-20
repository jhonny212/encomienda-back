import { Request, Response } from 'express';
import { prisma } from '../models/database'
import { paginator } from '../utils/paginator';
import { updateCleaner } from '../utils/crud';
import { getAllRoutes, getBestPath } from '../scripts/bestRoute'
import { estimateVehicleCost, updateOrder } from './orderRepository';
import { createNewLog, getLogsByOrder } from './logRepository';
import dotenv from 'dotenv';
import { OrderStatus } from '../enum/enums';

const QRCode = require('qrcode')

export const getPath = async (req: Request) => {
    const { origin, destiny, type } = req.body
    if (Number(type) == 1) {
        return getBestPath(Number(origin), Number(destiny))
    } else {
        const routes = await getAllRoutes(Number(origin), Number(destiny))
        const sumWeight = (route: RouteRequest[]) => route.reduce((sum, r) => sum + r.weight, 0);
        const sortedRoutes = routes.sort((a, b) => sumWeight(a) - sumWeight(b));
        return sortedRoutes;
    }
}

export const createTracking = async (routes: RouteRequest[], orderId: number, vehicles: any) => {
    type tracking = {
        routeId: number;
        orderId: number;
        cost: number;
        price: number;
        vehicleCost: number;
    }
    const bulkTracking: tracking[] = []
    routes.forEach(route => {
        const el: tracking = {
            routeId: route.id || 0,
            cost: route.costWeight,
            price: route.priceWeight,
            orderId,
            vehicleCost: vehicles[route.originId].total
        }
        bulkTracking.push(el);
    })
    const result = await prisma.tracking.createMany({
        data: bulkTracking
    })
}

export const updateTracking = async (data: {}, id: number) => {
    return prisma.tracking.update({
        data,
        where: {
            id
        }
    })
}

export const updateLog = async ( id: number) => {
    return prisma.tracking.update({
        data: {passed: true},
        where: {
            id
        }
    })
}

const forceTracking = async (newRoute: RouteRequest, order: number) => {
    const vehicle = await prisma.vehicle.findFirst({
        where: {
            branchOfficeId: newRoute.originId,
        }
    })

    const totalWeight = await prisma.package.aggregate({
        _sum: {
            weight: true
        },
        where: {
            orderId: order
        }
    })

    const log: LogRequest = {
        orderId: order,
        passed: false,
        routeId: newRoute.id || 0,

        //Calculate
        cost: newRoute.costWeight * (totalWeight._sum.weight || 0),
        total: newRoute.priceWeight * (totalWeight._sum.weight || 0),
        vehicleCost: (vehicle?.priceWeight || 0) * (totalWeight._sum.weight || 0),
        vehicleId: vehicle?.id || 0
    };
    return log
}

export const moveOrder = async (req: Request) => {
    const response = {
        message: "",
        completed: false
    }

    //Get tracking
    const getTrack = (orderId: number, passed: boolean, take: number) => {
        return prisma.tracking.findMany({
            where: {
                orderId,
                passed
            },
            orderBy: {
                id: 'asc'
            },
            select: {
                id: true,
                passed: true,
                route: true
            },
            take
        })
    }

    const { order, force, newRoute } = req.body
    const paths = await getTrack(order, false, 2)
    const orderInfo = await prisma.order.findFirst({
        where: {
            id: order
        },
    })

    if (!orderInfo) {
        response.message = "No se encontro la orden"
        return response
    }

    if (orderInfo.orderStatusId == OrderStatus.DELIVERED) {
        response.message = "La orden ya ha sido entregada"
        return response
    }

    if (orderInfo.orderStatusId == OrderStatus.CANCELED) {
        response.message = "La orden fue cancelada"
        return response
    }

    const logs = await getLogsByOrder(order, { type: 'desc' }, 1,false)
    const validLog = logs.length == 0 || logs[0].route.originId == paths[0].route.originId
    
    let logResult: LogRequest = { cost: 0, orderId: 0, passed: true, routeId: 0, total: 0, vehicleCost: 0, vehicleId: 0 };
    
    //Check if theres actual and next tracking
    if (paths.length > 1 && validLog) {
        const actualTrack = paths[0]
        const nextTrack = paths[1]

        //Get next branch
        const nextBranch = await prisma.branchOffice.findFirst({
            where: {
                id: nextTrack.route.originId,
                isActive: true
            }
        })

        if (nextBranch && !force) {
            const result = await updateTracking({ passed: true }, actualTrack.id)

            if (result.passed) {
                const log = await forceTracking(actualTrack.route, order)
                logResult = await createNewLog(log)
            }

        } else if (force) {
            //Force logic
            const result = await updateTracking({ passed: true }, actualTrack.id)
            if (result.passed) {
                const log = await forceTracking(newRoute, order)
                logResult = await createNewLog(log)
            } else {
                response.message = "Error al mover a nueva ruta, intente de nuevo."
            }
        }
    } else if (!validLog) {
        //Froce logic with logs and no tracking
        const log = await forceTracking(newRoute, order)
        logResult = await createNewLog(log)
    }
    else {
        //FINAL BRANCH
        const finalTrack = paths[0]
        const result = await updateTracking({ passed: true }, finalTrack.id)
        if (result.passed) {
            const log = await forceTracking(finalTrack.route, order)
            logResult = await createNewLog(log)
        }
    }

    if (logResult.id) {
        if(logs.length){
            updateLog(logs[0].id)
        }
        const finalRoute = await prisma.route.findFirst({
            where: {
                id: logResult.routeId
            }
        })
        if (orderInfo.brachOfficeId == finalRoute?.destinationId) {
            response.message = "La orden ha sido entregada a la sucursal final"
            await updateOrder({ orderStatusId: OrderStatus.DELIVERED, deliveredDate: new Date() }, order)
        } else {
            response.message = "Orden actualizada"
            await updateOrder({ orderStatusId: OrderStatus.INROAD }, order)
        }
        response.completed = true
    }else{ 
        response.message = "Error al actualizar"
    }

    return response

}

export const generateQRCode = async (req: Request) => {
    const { orderId } = req.params
    dotenv.config();
    const port = process.env.PORT_FRONT;
    const host = process.env.HOST_FRONT;
    const url =  await QRCode.toDataURL(`${host}${port}/tracking/${orderId}`)
    return {url}
}

export const trackQr = async (req:Request) => {
    const { orderId } = req.params
    return prisma.log.findMany({
        where: {orderId: Number(orderId)},
        select: {
            cost: true,
            date: true,
            id: true,
            order: true,
            passed: true,
            route: true,
            total: true,
            vehicle: true,
            vehicleCost: true,
            
        },
        orderBy: {
            id: 'asc'
        }
    })
}
