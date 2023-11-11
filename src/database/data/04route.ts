import { prisma } from '../../models/database'

function generateRandomNumber(min=1,max=5) {
    const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    return randomNumber;
}

async function fillRoutes(size: number = 10) {
    const branches = await prisma.branchOffice.findMany()
    const paths = []
    for (let index = 0; index < branches.length; index++) {
        const branch = branches[index]

        if(!(index + 1 === branches.length)){
            for (let index2 = index + 1; index2 < branches.length; index2++) {
                const branch2 = branches[index2]
                const tmp = {
                    name: "branch",
                    originId: branch.id,
                    destinationId: branch2.id,
                    weight: generateRandomNumber(1,6)
                }
                paths.push(tmp)
            }
        }
    }

    const result = await prisma.path.createMany({
        data: paths
    })
}

fillRoutes()