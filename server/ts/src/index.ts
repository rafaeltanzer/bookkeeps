import express, { Express, NextFunction, Request, Response } from 'express';
import * as dotenv from 'dotenv';
import path from 'path';
import { apiRouter } from './services/api/apiRouter';
import * as bp from 'body-parser';
import { errorHandler } from './services/api/errorController';
import { accountRouter } from './services/api/router/accountRouter';
import { asyncHandler } from './utils/asyncRequestWrapper';

// const result = dotenv.config({path: '../assets/.env'});
const result = dotenv.config({path: 'C:/Users/rafae/Desktop/Code/bookeeps/bookkeeps/server/outDir/assets/.env'});


if (result.error) {
    throw result.error
  }
  
  console.log(result.parsed)

const app: Express = express();
const port = process.env.EXPRESS_PORT;

app.use(bp.json());
app.use(bp.urlencoded({extended: true}));

app.use(asyncHandler(async(req: Request, res: Response, next: NextFunction) => {
  //authenticate
  next();
}));

app.use(apiRouter);
app.use('/account', accountRouter);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});