import { Request, Response } from 'express';
import {prisma} from '../models/database'
import { paginator } from '../utils/paginator';


/**
 * The function getAllJobs retrieves all jobs from the database using pagination.
 * @param {Request} req - The `req` parameter is the request object, which contains information about
 * the incoming HTTP request such as headers, query parameters, and body.
 * @param {Response} res - The `res` parameter is the response object that will be sent back to the
 * client. It is used to send the response data, set headers, and handle any errors that may occur
 * during the request.
 * @param {number} [pageSize=0] - The `pageSize` parameter is used to specify the number of jobs to be
 * returned per page. It determines the size of each page when paginating the results. If not provided,
 * the default value is set to 0.
 * @returns a promise that resolves to an array of job objects.
 */
export const getAllJobs = async (req: Request, res: Response) => {
    const options = paginator(req)
    return prisma.job.findMany({
        ...options,
        include: {
            jobType: true
        }
    })
}

//Creates
/**
 * The function creates a job using the data from the request body and returns the created job.
 * @param {Request} req - The `req` parameter is an object representing the HTTP request made to the
 * server. It contains information such as the request method, headers, query parameters, and request
 * body.
 * @param {Response} res - The `res` parameter is the response object that will be sent back to the
 * client. It is used to send the response data, such as status codes, headers, and the response body.
 * @returns a Promise that resolves to the result of creating a new job in the database using the
 * Prisma client.
 */
export const createJob = async (req: Request, res: Response) => {
    const body = req.body as JobRequest
    return prisma.job.create({
        data: {
            ...body
        }
    })
}
