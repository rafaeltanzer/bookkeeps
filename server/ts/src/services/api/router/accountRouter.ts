import express, { NextFunction, Request, request, Response } from "express";
import { Account } from "../../../models/allModels";
import { asyncHandler } from "../../../utils/asyncRequestWrapper";
import { CError } from "../../../utils/cError";
import {AccountController} from '../../persistance/controller/accountController'

//AccountROuter basically is AccountController. Use IUnitOfWork somehow inject it; Prob. own controller classes and router simply calls methods of controller
// Or DI for non classes

type AccountParam = {email: string; name: string};
export const accountRouter = express.Router();

accountRouter.route('')
    .get(asyncHandler(async (req: Request, res: Response) => {
        let controller = new AccountController();
        var accountName = req.query.name;
        var accountUser = req.query.email;
        var account = await controller.findOneDocument({name: accountName, userEmail: accountUser});
        res.status(200).send(account);
    }))
    .post(asyncHandler(async (req: Request, res: Response) => {        
        let controller = new AccountController();
        let newAccount: Account = req.body;
        await controller.createNewDoument(newAccount);//name of account model should be generated in backend not passed through the body // Only compare the sent with the generated so it does not break the pattern!
        res.sendStatus(201);
    }))
    .put((req: Request<{},{},Account, AccountParam>, res: Response) => {
        if(Object.keys(req.body).length <= 0)
            throw new CError("Body cannot be empty!");
        res.send(req.body);
    })
    .delete(asyncHandler(async (req: Request, res: Response) => {
        let controller = new AccountController();
        var accountName = req.query.name;
        let didDelete = await controller.deleteOneDocument({name: accountName});
        didDelete ? res.sendStatus(200) : res.sendStatus(404);        
    }));

    //https://stackoverflow.com/a/51391081 Better Solution for UnhandledPromiseRejectionError than always using trycatch
accountRouter.get('/all-with-transactions', asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    let controller = new AccountController();
    let email = req.query.email as string;
    var result = await controller.getAccountsByUserWithTransaction(email);
    res.status(200).send(result);
}));