import mongoose from 'mongoose';
import { CError, DatabaseFieldError, DatabaseRecordError } from '../../utils/cError';
import {MongoServerError} from 'mongodb';

export class MongoConnector{
    //env variables for pass and user(for future)
    private uri: string = 'mongodb://127.0.0.1:'+process.env.MONGO_PORT;

    //Connecction to DB
    public connectToDatabase(){
        mongoose.connect(this.uri, (err:any) => {
            if(err){
                console.log(err);
            }else{
                console.log("Connection successful")
            }
        });
    }

    public DisconnectFromDatabase(){
        mongoose.disconnect();
    }
}

export function generateCustomError(error: any): DatabaseRecordError | null{

    if(error instanceof mongoose.MongooseError){                
        if(error.name === 'ValidationError'){// MAybe extend with cast error
            var castedErr = error as mongoose.Error.ValidationError;
            var recordError = new DatabaseRecordError(castedErr.name + ": " + castedErr.message, "ValidationError");

            var errVals = Object.values(castedErr.errors).map(err => err.value);
            var errPaths = Object.values(castedErr.errors).map(err => err.path);
            var errMsgs = Object.values(castedErr.errors).map(err => err.message);

            var fieldErr: DatabaseFieldError;
            for (let i = 0; i < errPaths.length; i++) {
                //create Custom Erros
                fieldErr = new DatabaseFieldError("Field specific validation error.", {field: errPaths[i], value: errVals[i], msg: errMsgs[i]});
                recordError.addError(errPaths[i], fieldErr);
            }
            return recordError;
        }
        return new DatabaseRecordError(error.message, error.name);
    }else if(error instanceof MongoServerError){
        if(error.code && error.code === 11000){
            var probDupErr = error as any;
            var dupField = Object.keys(probDupErr.keyValue)[0];// maybe extend to array
            var recordError = new DatabaseRecordError("A duplicate key error has been raised!", "DuplicateKeyError");
            fieldErr = new DatabaseFieldError("Duplicate Key Error. Field already exists.", {field: dupField, value: 0, msg: "Already existing value"});
        }
        return new DatabaseRecordError(error.message, error.name);
    }else{
        return new DatabaseRecordError(error.toString());
    }
}