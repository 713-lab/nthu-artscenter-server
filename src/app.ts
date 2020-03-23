import express from 'express';
import bodyParser from 'body-parser';
import dotenv from "dotenv";
import routeV2 from './routes/route.v2';
// import morgan from 'morgan';
import { startDataBase } from './models/index';
import { db } from './config/database'
import morganBody from 'morgan-body';

const app = express();


app.set("port", process.env.SERVER_PORT || 8080);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// app.use(morgan('combined'));
morganBody(app);

app.use('/api/v2', routeV2);

export default app;