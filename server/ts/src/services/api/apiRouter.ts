import express, { request, Request, Response } from 'express';

const apiRouter = express.Router();

apiRouter.get('/', (req: Request, res: Response) => {
    res.send('Express + TypeScript Server');
});

apiRouter.route('/user')
    .get((req: Request, res: Response) => {res.send("User get")})
    //.post((req: Request, res: Response) => {})//send some kind of custom id so not everyon can create
    .put((req: Request, res: Response) => {res.send("User put")})// check jwt
    .delete((req: Request, res: Response) => {res.send("User delete")});

apiRouter.post('/user/signin', (req: Request, res: Response) => {

});
apiRouter.post('user/signup', (req: Request, res: Response) => {

});

apiRouter.route('/account')
    .get((req: Request, res: Response) => {res.send("Acc get")})
    .post((req: Request, res: Response) => {res.send("acc post")})
    .put((req: Request, res: Response) => {res.send("acc put")})
    .delete((req: Request, res: Response) => {res.send("acc del")});

    apiRouter.route('/transaction')
    .get((req: Request, res: Response) => {res.send("Trans get")})
    .post((req: Request, res: Response) => {res.send("actransc post")})
    .put((req: Request, res: Response) => {res.send("trans put")})
    .delete((req: Request, res: Response) => {res.send("trans del")});

export {apiRouter};