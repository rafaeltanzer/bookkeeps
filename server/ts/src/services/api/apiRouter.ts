import express, { request, Request, Response } from 'express';
import {Account} from '../../models/allModels';
import { CError } from '../../utils/cError';

type AccountParam = {email: string; name: string};

const apiRouter = express.Router();

apiRouter.get('/', (req: Request, res: Response) => {
    res.send('Express + TypeScript Server');
});

apiRouter.route('/user')
    .get((req: Request, res: Response) => {
        res.send(req.body)
    })
    //.post((req: Request, res: Response) => {})//send some kind of custom id so not everyon can create
    .put((req: Request, res: Response) => {
        res.send(req.body)
    })// check jwt
    .delete((req: Request, res: Response) => {
        res.send(req.body)
    });

apiRouter.post('/user/signin', (req: Request, res: Response) => {
    if(Object.keys(req.body).length<= 0){
        throw new CError("Body cannot be empty!");
    }
});
apiRouter.post('user/signup', (req: Request, res: Response) => {
    if(Object.keys(req.body).length<= 0){
        throw new CError("Body cannot be empty!");
    }
});

//#region AccountRoutes
apiRouter.route('/account')
    .get((req: Request, res: Response) => {
        res.send(req.body)
    })
    .post((req: Request<{},{},Account>, res: Response) => {
        if(Object.keys(req.body).length <= 0)
            throw new CError("Body cannot be empty!");

        res.send(req.body.userEmail);
    })
    .put((req: Request<{},{},Account, AccountParam>, res: Response) => {
        if(Object.keys(req.body).length <= 0)
            throw new CError("Body cannot be empty!");
        res.send(req.body);
    })
    .delete((req: Request<{},{},{}, AccountParam>, res: Response) => {
        res.send(req.query.email + req.query.name);
    });

    apiRouter.get('/accounts-with-transaction', (req: Request<{},{},{},{email: string}>, res: Response) => {
        
    });
//#endregion

apiRouter.route('/transaction')
    .get((req: Request, res: Response) => {

        res.send(req.params.id)
    })
    .post((req: Request, res: Response) => {
        if(Object.keys(req.body).length <= 0)
            throw new CError("Body cannot be empty!");
        res.send(req.body)
    })
    .put((req: Request, res: Response) => {
        if(Object.keys(req.body).length <= 0)
            throw new CError("Body cannot be empty!");
        res.send(req.body)
    })
    .delete((req: Request, res: Response) => {
        res.send(req.params.id);
    });

export {apiRouter};