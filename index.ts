import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import swaggerApp from './swagger'
import cors from 'cors';

//ROUTERS
import jobTypeRoute from './src/routes/jobTypeRouter'
import jobRoute from './src/routes/jobRouter'




dotenv.config();

const app: Express = express();
const port = process.env.PORT;


app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server');
});

const allowedOrigins = ['http://localhost:3000'];

const options: cors.CorsOptions = {
  origin: allowedOrigins
};

// Then pass these options to cors:
app.use(cors(options));
app.use(express.json());
app.use(swaggerApp)
app.use("/api/jobType",jobTypeRoute);
app.use("/api/job",jobRoute);




app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});