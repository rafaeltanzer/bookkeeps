import mongoose from 'mongoose';
import { CError, DatabaseFieldError, DatabaseRecordError } from '../../utils/cError';
import {MongoServerError} from 'mongodb';
import { createWatchCompilerHost } from 'typescript';
import { errorHandler } from '../api/errorController';

export class MongoConnector{
    //env variables for pass and user(for future)
//    private static uri: string = 'mongodb://127.0.0.1:'+process.env.MONGO_PORT+'/bookkeeps'; Somehow error is thrown when .env in ouDir is altered

private static uri: string = 'mongodb://127.0.0.1:2717/bookkeeps';
    //Connecction to DB
    public static async connectToDatabase(){
        try{
            await mongoose.connect(this.uri, {keepAlive: false});
        }catch(error: any)
        {
            console.log(error);
        }
    }

    public static DisconnectFromDatabase(){
        mongoose.disconnect();
    }
}

export function generateCustomError(error: any): DatabaseRecordError | null {
    if(error instanceof Error){
        console.log("LOGGER:: ErrorName: " + error.name);
        if(error instanceof MongoServerError){
            console.log("LOGGER: MongoServerError it is");
            if(error.code && error.code === 11000){
                let probDupErr = error as any;
                let dupField = Object.keys(probDupErr.keyValue)[0];// maybe extend to array
                let dupVal = Object.values(probDupErr.keyValue)[0];
                let recordError = new DatabaseRecordError("A duplicate key error has been raised!", "DuplicateKeyError");
                let fieldErr = new DatabaseFieldError("Duplicate Key Error. Field already exists.", {field: dupField, value: dupVal, msg: "Already existing value"});
                let recordErr = new DatabaseRecordError(error.name + ":" + error.message, "DuplicateKeyError");
                recordErr.addError(dupField, fieldErr);
                return recordErr;
            }else{
                return new DatabaseRecordError(error.name + error.message, "MongoServerError");
            } 
        }else if(error.name === 'ValidationError'){//Extend with CastError
            console.log("LOGGER:: MongooseEerror");
            console.log("LOGGER: MOngoose -> ValidationError");
            var castedErr = error as mongoose.Error.ValidationError;
            var recordError: DatabaseRecordError = new DatabaseRecordError(castedErr.name + ": " + castedErr.message, "ValidationError");

            var errVals = Object.values(castedErr.errors).map(err => err.value);
            var errPaths = Object.values(castedErr.errors).map(err => err.path);
            var errMsgs = Object.values(castedErr.errors).map(err => err.message);

            var fieldErr: DatabaseFieldError;
            for (let i = 0; i < errPaths.length; i++) {
                //create Custom Erros
                fieldErr = new DatabaseFieldError("Field specific validation error.", {field: errPaths[i], value: errVals[i], msg: errMsgs[i]});
                recordError.addError(errPaths[i], fieldErr);
            }

            if(recordError instanceof DatabaseRecordError){
                console.log('LOGGER:: recordError is Type Of DRE in databaseUtil');
                console.log(recordError);
            }

            return recordError;
        }
        else{
            return new DatabaseRecordError(error.toString(), "ErrorType");
        }            
    }
    return new DatabaseRecordError(error.toString());
}