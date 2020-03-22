import express from 'express';
import bodyParser from 'body-parser';
import dotenv from "dotenv";
import routeV2 from './routes/route.v2';
import morgan from 'morgan';
import { startDataBase } from './models/index';
import { db } from './config/database'


dotenv.config();

const app = express();

db.sync()
.then(async() => {
  await startDataBase();
})

app.set("port", process.env.SERVER_PORT || 3000);

app.use(bodyParser.json());
app.use(morgan('combined'));

app.use('/api/v2', routeV2);

export default app;