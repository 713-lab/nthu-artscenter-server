import express from 'express';
import bodyParser from 'body-parser';
import dotenv from "dotenv";
import routeV2 from './routes/route.v2';
import morgan from 'morgan';
import morganBody from 'morgan-body';
import path from 'path';

import redis from 'redis';
import connectRedis from 'connect-redis';
import session from 'express-session';

const RedisStore = connectRedis(session);
const redisClient = redis.createClient({
  host: process.env.REDISIP || '127.0.0.1',
  port: parseInt(process.env.REDIS_PORT, 10) || 6379,
});

dotenv.config();

const app = express();

app.set("port", process.env.SERVER_PORT || 8090);

redisClient.on('error', (err) => {
  // tslint:disable-next-line:no-console
  console.log('Redis error: ', err);
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set('trust proxy', 1);
app.use(session({
  name: "sessionId",
  secret: process.env.SECRET || 'testing artscenter',
  resave: true,
  saveUninitialized: true,
  store: new RedisStore( { client: redisClient }),
  cookie: { secure: process.env.isHTTPS === 'true' || false, maxAge: 600 * 1000 },
}));

// app.use(morgan('combined'));
morganBody(app);

app.use(express.static(path.join(__dirname, "../public")));

app.use('/api/v2', routeV2);
app.set("views", path.join(__dirname, "../views"));
app.set("view engine", "pug");

export default app;