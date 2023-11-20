import { Router, Request, Response } from 'express';
import { getAllGoals, getAllMovements, getMovementsByBranch, getMovementsByVehicle,getVehicleAllMovements } from '../scripts/reports/movements';
import * as ExcelJS from 'exceljs';

export const reportRouter = Router();

async function generarExcel(datos: any[]) {
    const workbook = new ExcelJS.Workbook();
    const sheet = workbook.addWorksheet('Datos');

    if(datos.length > 0){
        // Encabezados de las columnas
        const columnas = Object.keys(datos[0]);
        sheet.addRow(columnas);

        // Agregar datos
        datos.forEach((fila) => {
            const valores = columnas.map((columna) => fila[columna]);
            sheet.addRow(valores);
        });
    }
    

    // Guardar el archivo
    return await workbook.xlsx.writeBuffer();
}

reportRouter.get('/movements/:branch', async (req:Request, res:Response) => {
    try {
        const data = await getMovementsByBranch(Number(req.params.branch))
        const file = await generarExcel(data);
        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.setHeader('Content-Disposition', 'attachment; filename=datos.xlsx');
        return res.status(200).send(file)
    } catch (error) {
        res.status(500).json(error)
    }
})

reportRouter.get('/movements', async (req:Request, res:Response) => {
    try {
        const data = await getAllMovements()
        const file = await generarExcel(data);
        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.setHeader('Content-Disposition', 'attachment; filename=datos.xlsx');
        return res.status(200).send(file)
    } catch (error) {
        res.status(500).json(error)
    }
})

reportRouter.get('/vehicle/movements/:branch', async (req:Request, res:Response) => {
    try {
        const data = await getMovementsByVehicle(Number(req.params.branch))
        const file = await generarExcel(data);
        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.setHeader('Content-Disposition', 'attachment; filename=datos.xlsx');
        return res.status(200).send(file)
    } catch (error) {
        res.status(500).json(error)
    }
})

reportRouter.get('/vehicle/movements', async (req:Request, res:Response) => {
    try {
        const data = await getVehicleAllMovements()
        const file = await generarExcel(data);
        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.setHeader('Content-Disposition', 'attachment; filename=datos.xlsx');
        return res.status(200).send(file)
    } catch (error) {
        res.status(500).json(error)
    }
})

reportRouter.get('/goals', async (req:Request, res:Response) => {
    try {
        const data = await getAllGoals()
        const file = await generarExcel(data);
        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.setHeader('Content-Disposition', 'attachment; filename=datos.xlsx');
        return res.status(200).send(file)
    } catch (error) {
        res.status(500).json(error)
    }
})