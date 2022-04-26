import { BaseRepository } from "../../database_logic/databaseRepository";
import {Account, AccountSchema} from '../../../models/allModels';
import mongoose from "mongoose";

export class AccountController extends BaseRepository<Account>{
    private modelCollection: string;
    private modelSchema: mongoose.Schema;
    constructor(modelSchema: mongoose.Schema = AccountSchema, modelCollection: string = 'Account'){
        super(modelSchema, modelCollection);
        this.modelCollection = modelCollection;
        this.modelSchema = modelSchema;
    }

    //Extends the basController for future queries specific to the Account Collection
}