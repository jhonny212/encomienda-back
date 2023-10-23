import { Request, Response } from 'express';
import {prisma} from '../models/database'
import {paginator} from '../utils/paginator';
import { updateCleaner } from '../utils/crud';

//Employee CRUD
export const getEmployees =async (pageSize: number) => {
    return prisma.employee.findMany(paginator(pageSize))
}

export const createEmployee = async (req:Request) => {
    const data = req.body as EmployeeRequest
    return prisma.employee.create({
        data
    })
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
export const getUsers = async (pageSize: number) => {
    return prisma.user.findMany(paginator(pageSize))
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

