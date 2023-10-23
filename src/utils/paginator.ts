import { Router, Request, Response } from 'express';

export const paginator = (req: Request, filters: {} = {})=> {
    console.log(req.query);
    const pageSize = Number(req.query.pageSize) || -1
    const page = Number(req.query.page) || 10
    if(pageSize == -1) return {}
    return {skip: page, take: pageSize, ...filters}
}
