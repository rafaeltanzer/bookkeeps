import { NextFunction, Request, Response, } from "express";
import type { ErrorRequestHandler } from "express";
import { CError, DatabaseRecordError } from "../../utils/cError";


export const errorHandler: ErrorRequestHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    
    if(err instanceof CError){
        console.log("LOGGER:: ErrorType in Handler: ");
        if(err instanceof DatabaseRecordError){//Instbance of CError by now
            if(err.name === 'ValidationError'){// CastERoor extention
                let valErr = err as DatabaseRecordError;
                let errFields = Object.values(valErr.errors).map(el => el.field);
                let errMsgs = Object.values(valErr.errors).map(el => el.msg);
        
                res.status(422).send({
                    errorName: valErr.name,
                    errorMessage: valErr.message,
                    errorFields: errFields,
                    fieldMessages: errMsgs
                });
        
            }else if(err.name === 'DuplicateKeyError'){
                let dupeErr = Object.values((err as DatabaseRecordError).errors)[0]
                res.status(409).send({
                    errroName: dupeErr.name,
                    errorMessage: dupeErr.message,
                    errorField: dupeErr.field,
                    errorValue: dupeErr.value
                });
            }else{
                res.status(500).send({errorName: err.name, errorMessage: err.message});
            }
        }
        else{
            if(err.name === 'NotFoundError'){
                res.sendStatus(404);
            }else if(err.name === 'NoContent'){
                res.sendStatus(204);
            }else{
                res.status(400).send({errorMessage: err.message});//Maybe 500 INternal the future will reveal the truth!
            }
        }
    }else{
        res.status(400).send({errorMessage: "An unspecified error occurred!"});//Maybe 500 INternal the future will reveal the truth!
    }
}