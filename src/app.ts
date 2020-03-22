import express from 'express';
import bodyParser from 'body-parser';
import dotenv from "dotenv";
import routeV2 from './routes/route.v2';
import morgan from 'morgan';
import { startDataBase } from './models/index'


dotenv.config();

const app = express();

startDataBase().then( () => {
  // tslint:disable-next-line:no-console
  console.log("Load Database OK");
})
.catch( () => {
  // tslint:disable-next-line:no-console
  console.log("Fail to load Database");
})

app.set("port", process.env.SERVER_PORT || 3000);

app.use(bodyParser.json());
app.use(morgan('combined'))

app.use('/api/v2', routeV2);

export default app;