import express, { Request, Response } from 'express';

const apiRouter = express.Router();

apiRouter.get('/', (req: Request, res: Response) => {
    res.send('Express + TypeScript Server');
});

export {apiRouter};