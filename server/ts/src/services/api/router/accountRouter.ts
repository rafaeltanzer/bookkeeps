import express, { Request, request, Response } from "express";
import { Account } from "../../../models/allModels";
import { CError } from "../../../utils/cError";
import {AccountController} from '../controller/accountController'

type AccountParam = {email: string; name: string};
const accountRouter = express.Router();

accountRouter.route('')
    .get((request: Request, response: Response) => {
        response.sendStatus(200);
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

accountRouter.get('/all-with-transactions', (req: Request<{},{},{},{email: string}>, res: Response) => {
    let controller = new AccountController();
    
});