import express, { Express, Request, Response } from 'express';
import * as dotenv from 'dotenv';
import path from 'path';
import { apiRouter } from './services/api/apiRouter';
import * as bp from 'body-parser';
import { errorHandler } from './services/api/errorController';

const result = dotenv.config({path: '../assets/.env'});


if (result.error) {
    throw result.error
  }
  
  console.log(result.parsed)

const app: Express = express();
const port = process.env.EXPRESS_PORT;

app.use(bp.json());
app.use(bp.urlencoded({extended: true}));

app.use(apiRouter);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});