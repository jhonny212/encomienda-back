import { Router, Request, Response } from 'express';
import { 
    createEmployee,createUser,getEmployees,getUsers,login,
    updateEmployee,updateUser,
    deleteEmployee
} from '../database/profileRepository'
import { prisma } from '../models/database';
import { GetResponsePaginated } from '../utils/crud';

export const profileRouter = Router();

profileRouter.get('/user',async (req:Request,res:Response) => {
    try {
        const result = await getUsers(req)
        return res.status(200).json(await GetResponsePaginated(prisma.user,result));
    } catch (error) {
        return res.status(500).json(error);
    }
})

profileRouter.get('/employee',async (req:Request,res:Response) => {
    try {
        const result = await getEmployees(req)
        return res.status(200).json(await GetResponsePaginated(prisma.employee,result));
    } catch (error) {
        return res.status(500).json(error);
    }
})

profileRouter.post('/user',async (req:Request,res:Response) => {
    try {
        const result = await createUser(req)
        return res.status(200).json(result)
    } catch (error) {
        console.log(error);
        
        return res.status(500).json(error)
    }
})

profileRouter.post('/employee',async (req:Request,res:Response) => {
    try {
        const result = await createEmployee(req)
        return res.status(200).json(result)
    } catch (error) {
        console.log(error);
        
        return res.status(500).json(error)
    }
})

profileRouter.delete('/employee', async (req:Request, res:Response) =>{
    try{
        const result = await deleteEmployee(req,res)
        return res.status(200).json(result)
    }catch(err){
        return res.status(500).json(err)
    }
})

profileRouter.put('/user',async (req:Request,res: Response) => {
    try {
        const result = await updateUser(req)
        return res.status(200).json(result)
    } catch (error) {
        return res.status(500).json(error)
    }
})

profileRouter.put('/employee',async (req:Request,res: Response) => {
    try {
        const result = await updateEmployee(req)
        return res.status(200).json(result)
    } catch (error) {
        return res.status(500).json(error)
    }
})


profileRouter.post('/login',async (req:Request,res:Response) => {
    try {
        const result = await login(req)
        return res.status(200).json(result)
    } catch (error) {
        return res.status(500).json(error)
    }
})