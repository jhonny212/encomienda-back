import { prisma } from '../../models/database'

function generateRandomNumber(min=1,max=5) {
    const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    return randomNumber;
}

async function fillRoutes(size: number = 10) {
    interface RouteRequest {
        id?: number;
        name: string;
        priceWeight: number;
        costWeight: number;
        originId: number;
        destinationId: number;
        isActive: boolean;
        weight: number;
      }

    const branches = await prisma.branchOffice.findMany()
    const paths = []
    for (let index = 0; index < branches.length; index++) {
        const branch = branches[index]

        if(!(index + 1 === branches.length)){
            for (let index2 = index + 1; index2 < branches.length; index2++) {
                const branch2 = branches[index2]
                const tmp: RouteRequest = {
                    name: "branch",
                    originId: branch.id,
                    destinationId: branch2.id,
                    weight: generateRandomNumber(1,6),
                    costWeight: 0,
                    isActive:true,
                    priceWeight: 0,
                }
                paths.push(tmp)
            }
        }
    }

    const result = await prisma.route.createMany({
        data: paths
    })
    console.log(paths);
    
}
   
fillRoutes()