import { Request, Response } from 'express';
import {prisma} from '../models/database'
import {paginator} from '../utils/paginator';
import { updateCleaner } from '../utils/crud';
import {getJobById} from '../database/jobRepository'

//Employee CRUD
export const getEmployees =async (req: Request) => {
    return prisma.employee.findMany({
        ...paginator(req),
        include: {
            job: true,
            branchOffice: true
        }
    })
}

export const createEmployee = async (req:Request) => {
    const data = req.body as EmployeeRequest
    const salary = data.salary || (await getJobById(data.jobId))?.baseSalary
    if(salary){
        return prisma.employee.create({
            data: {
                ...data,
                salary: salary
            }
            }
        )
    }else{
        return {}
    }
    
}

export const updateEmployee = async (req:Request) => {
    const [pk, newdata ]= updateCleaner(req,"id")
    const data = newdata as EmployeeRequest
    return prisma.employee.update({
        data,
        where: {
            id: pk
        }
    })
}

//User CRUD
export const getUsers = async (req: Request) => {
    return prisma.user.findMany({
        ...paginator(req),
        include: {
            employee: true
        }
    })
}

export const createUser = async (req:Request) => {
    const data = req.body as UserRequest
    return prisma.user.create({
        data
    })
}
export const updateUser = async (req:Request) => {
    const [pk, newdata ]= updateCleaner(req,"id")
    const data = newdata as UserRequest
    return prisma.user.update({
        data,
        where: {
            id: pk
        }
    })
}

export const login = async (req:Request) => {
    const user = await prisma.user.findFirst({
        where: {
            password: req.body.password,
            email: req.body.email
        },
        select: {
            email: true,
            employee: {
                select: {
                    jobId: true,
                    name: true,
                }
            }
        }
    })
    return user || {}
}

