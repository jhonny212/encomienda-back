import { prisma } from '../models/database'

export async function getAllRoutes(start: number, end: number){
    const routes: RouteRequest[][] = []

    async function getBestPath(idSearch: number) {
        const path = await prisma.route.findMany({
            orderBy: {
                weight: 'asc'
            },
            where: {
                originId: idSearch,
                id: {
                    notIn: []
                }
            }
        })
        return path
    }

    const createResponse = async function (path: number[]) {
        let tmp: RouteRequest[] = []
        for (let index = 0; index < path.length; index++) {
            const origin = path[index];
            const destiny = path[index + 1] || -1
            const element = await prisma.route.findFirst({
                where: {
                    originId: origin,
                    destinationId: destiny
                }
            })
            if (element != null) {
                tmp.push(element as RouteRequest)
            }
        }
        return tmp
    }

    async function findRoutes(start: number, end: number, visited = new Set(), path: number[] = []) {
        visited.add(start);
        path.push(start);

        if (start === end) {
            routes.push(await createResponse(path))
        } else {
            const Routes = (await getBestPath(start))
            for (const nextPath of Routes) {
                if (!visited.has(nextPath.destinationId)) {
                    await findRoutes(nextPath.destinationId, end, visited, [...path]);
                }
            }
        }

        visited.delete(start);
        path.pop();
    }
    await findRoutes(start,end)
    return routes;
}

export async function getBestPath(start: number, end: number){
    const Routes = await getAllRoutes(start, end)
    
    const weights = Routes.map((path)=>{
        return path.reduce((acum, el) => acum + el.weight, 0);
    })
    const minValue = Math.min(...weights)
    const indexMinValue = weights.indexOf(minValue);
    return Routes[indexMinValue]
}

