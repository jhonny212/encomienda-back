import { Request, Response } from 'express';
import {prisma} from '../models/database'
import {paginator} from '../utils/paginator';
import { removeEntity, updateCleaner } from '../utils/crud';
import {getJobById} from '../database/jobRepository'

//Employee CRUD
export const getEmployees =async (req: Request) => {
    return prisma.employee.findMany({
        ...paginator(req),
        where: {
            isActive: true
        },
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

export const deleteEmployee = async (req: Request, res: Response) => {
    const { id } = req.body
    return removeEntity(prisma.employee,id) 
}


//User CRUD
export const getUsers = async (req: Request) => {
    return prisma.user.findMany({
        ...paginator(req),
        where: {
            employee: {
                isActive: true
            }
        },
        include: {
            employee: true
        }
    })
}

export const createUser = async (req:Request) => {
    const data = req.body as UserRequest
    const user = await prisma.user.create({
        data
    })
    return prisma.user.findFirst({
        where: {
            id: user.id
        },
        select: {
            email: true,
            id: true,
            name: true,
            employee: {
                select: {
                    branchOffice: true,
                    job: {
                        select: {
                            baseSalary: true,
                            description: true,
                            jobType: true,
                            id: true,
                            name: true
                        }
                    },
                    name: true,
                }
            }
        }
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
            email: req.body.email,
            employee: {
                isActive: true
            }
        },
        select: {
            email: true,
            id: true,
            name: true,
            employee: {
                select: {
                    branchOffice: true,
                    job: {
                        select: {
                            baseSalary: true,
                            description: true,
                            jobType: true,
                            id: true,
                            name: true
                        }
                    },
                    name: true,
                }
            }
        }
    })
    return user || {}
}

