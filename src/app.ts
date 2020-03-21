import express from 'express';
import bodyParser from 'body-parser';
import dotenv from "dotenv";
import routeV2 from './routes/route.v2';
import morgan from 'morgan';

import { Exhibition } from './models/Exhibition'
import { Media } from './models/Media'

dotenv.config();

const app = express();
const port = process.env.SERVER_PORT;

app.use(bodyParser.json());
app.use(morgan('combined'))

app.use('/api/v2', routeV2)

app.listen(port, async () => {
  try {
    await Exhibition.sync({alter: true});
    await Media.sync({alter: true});
    // tslint:disable-next-line:no-console
    console.log( `server started at http://localhost:${ port }` );
  } catch(err) {
    // tslint:disable-next-line:no-console
    console.log(err);
  }

})