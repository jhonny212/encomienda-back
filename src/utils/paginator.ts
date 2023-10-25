import { Router, Request, Response } from 'express';

export const paginator = (req: Request, filters: {} = {})=> {
    const pageSize = Number(req.query.pageSize) || -1
    const page = Number(req.query.page) || 0
    if(pageSize == -1) return {}
    return {skip: page * pageSize, take: pageSize, ...filters}
}
