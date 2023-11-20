import { Router, Request, Response } from 'express';
import { gainMetric } from '../scripts/metrics/gain';
import { timeMetric } from '../scripts/metrics/time';
import { routeMetric } from '../scripts/metrics/route';

export const metricRouter = Router();

const metrics = async (req: Request) => {
    const gain = await gainMetric()
    const time = await timeMetric()
    const route = await routeMetric()

    function converData(data: any[]) {
        return data.map(e => Number(e).toFixed(2))
    }

    const gainData = {
        item: 'Metrica en base a ganancias',
        categories: gain.dataX,
        min: gain.dataY.length > 1 ? Math.min(...gain.dataY) : 0,
        max: Math.max(...gain.dataY).toFixed(2),
        series: [
            {
                name: 'Ganancias', data: converData(gain.dataY)
            }
        ],
        colors: ['rgba(0,0,0,0.1)']
    }


    const timeData = {
        item: 'Metrica en base a tiempo promedio de entrega',
        categories: time.dataX,
        min: time.dataY.length > 1 ? Math.min(...time.dataY) : 0,
        max: Math.max(...time.dataY).toFixed(2),
        series: [
            {
                name: 'Tiempo promedio de entrega', data: converData(time.dataY)
            }
        ],
        colors: ['rgba(0,0,0,0.1)']
    }

    const tmp = route.dataY.map(el => Number(el))

    const routeData = {
        item: 'Metrica en base a paquetes entregados exitosamente en base al tracking original',
        categories: route.dataX,
        min: tmp.length > 1 ? Math.min(...tmp) : 0,
        max: Math.max(...tmp).toFixed(2),
        series: [
            {
                name: 'Entregas con exito', data: converData(tmp)
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

metricRouter.get('', async (req: Request, res: Response) => {
    try {
        return res.status(200).json(await metrics(req))
    } catch (error) {
        console.log(error);

        return res.status(500).json(error)
    }
})