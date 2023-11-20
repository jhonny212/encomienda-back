import { Router, Request, Response } from 'express';
import { gainMetric } from '../scripts/metrics/gain';
import { timeMetric } from '../scripts/metrics/time';
import { routeMetric } from '../scripts/metrics/route';

export const metricRouter = Router();

const metrics = async (req: Request) => {
    const gain = await gainMetric()
    const time = await timeMetric()
    const route = await routeMetric()

    const gainData = {
         item: 'Metrica en base a ganancias',
         categories: gain.dataX,
         min: Math.min(...gain.dataY),
         max: Math.max(...gain.dataY),
         series: [
             {
                 name: 'Ganancias', data: gain.dataY
             }
         ],
         colors: ['rgba(0,0,0,0.1)']
    }
   
    
    const timeData ={
        item: 'Metrica en base a tiempo promedio de entrega',
        categories: time.dataX,
        min: Math.min(...time.dataY),
        max: Math.max(...time.dataY),
        series: [
            {
                name: 'Tiempo promedio de entrega', data: time.dataY
            }
        ],
        colors: ['rgba(0,0,0,0.1)']
    }

    const tmp = route.dataY.map(el=> Number(el))
    
    const routeData = {
        item: 'Metrica en base a paquetes entregados exitosamente en base al tracking original',
        categories: route.dataX,
        min: Math.min(...tmp),
        max: Math.max(...tmp),
        series: [
            {
                name: 'Entregas con exito', data: tmp
            }
        ],
        colors: ['rgba(0,0,0,0.1)']
    }

    
    

    return [
        gainData,
        timeData,
        routeData
    ];
}

metricRouter.get('',async (req:Request, res:Response) => {
    try {
        return res.status(200).json(await metrics(req))
    } catch (error) {
        console.log(error);
        
        return res.status(500).json(error)
    }
})