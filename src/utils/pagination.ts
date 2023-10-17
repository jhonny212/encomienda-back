import dotenv from 'dotenv'

dotenv.config();

const limit = Number(process.env.LIMIT)

export const paginator = (pageSize: number, filters: {} = {})=> {
    return {skip: pageSize, take: limit, ...filters}
}
