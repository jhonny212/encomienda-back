import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import swaggerApp from './swagger'
import cors from 'cors';

//ROUTERS

import {
    jobRouter,jobTypeRouter,orderRouter,packageRouter,
    roadRouter,branchRouter,pathRouter,vehicleRouter} from './src/routes'

dotenv.config();

const app: Express = express();
const port = process.env.PORT;


app.get('/api', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server');
});

const allowedOrigins = ['http://localhost:3000'];
const options: cors.CorsOptions = {
  origin: allowedOrigins
};


app.use(cors(options));
app.use(express.json());
app.use(swaggerApp)
app.use("/api/jobType",jobTypeRouter);
app.use("/api/job",jobRouter);
app.use("/api/road",roadRouter);
app.use("/api/branch",branchRouter);
app.use("/api/path",pathRouter);

app.use("/api/package",packageRouter);
app.use("/api/order",orderRouter);
app.use("/api/vehicle",vehicleRouter);




app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});