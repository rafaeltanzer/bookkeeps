import { NextFunction, Request, Response } from "express";
import { CError, DatabaseRecordError } from "../../utils/cError";


export function errorHandler(err: CError, req: Request, res: Response, next: NextFunction){
    if(err instanceof DatabaseRecordError){
        if(err.name === 'ValidationError'){// CastERoor extention
            let valErr = err as DatabaseRecordError;
            let errFields = Object.values(valErr.errors).map(el => el.field);
            let errMsgs = Object.values(valErr.errors).map(el => el.msg);
    
            res.sendStatus(422).send({
                errorName: valErr.name,
                errorMessage: valErr.message,
                errorFields: errFields,
                fieldMessages: errMsgs
            });
    
        }else if(err.name === 'DuplicateKeyError'){
            let dupeErr = Object.values((err as DatabaseRecordError).errors)[0]
            res.sendStatus(409).send({
                errroName: dupeErr.name,
                errorMessage: dupeErr.message,
                errorField: dupeErr.field,
                errorValue: dupeErr.value
            });
        }else{
            res.sendStatus(500).send({errorName: err.name, errorMessage: err.message});
        }
    }
    else{
        if(err.name === 'NotFoundError'){
            res.sendStatus(404).send();
        }
        res.sendStatus(400).send({errorMessage: "An unspecified error occurred!"});//Maybe 500 INternal the future will reveal the truth!
    }
}