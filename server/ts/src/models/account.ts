import mongoose from 'mongoose';
import * as models from './allModels';
import { EmailRegEx, matchingActualAmount, matchingMergedStrings } from '../services/database_logic/databaseValidation';
import { BaseRepository } from '../services/persistance/repositories/baseRepository';

export interface Account{
    name: string,
    title: string,
    incomingAmount: number,
    outgoingAmount: number,
    actualAmount: number,
    userEmail: string,
}

export const AccountSchema = new mongoose.Schema<Account>({
    name: {type: String, required: true, unique: true, toLowerCase: true},//title+email
    title: {type: String, required: true, unique: true, minlength: [2, 'Title must be at least 2 letters!']},
    incomingAmount:{ type: Number, min: 0},
    outgoingAmount: {type: Number, min: 0},
    actualAmount: {type: Number},
    userEmail: {type: String, required: true, match: [EmailRegEx, 'User email not correct!']},
});

AccountSchema.pre(['save', 'updateOne'], {document: true, query: false}, async function(){
    console.log("Pre Save, Update Account middleware..."+ this + "Type = " + typeof this);

    if(!(matchingActualAmount(this.incomingAmount, this.outgoingAmount, this.actualAmount)))
    {
        throw new mongoose.Error.ValidatorError({
            message: 'Actual amount does not match with ongoing transactive amounts!',
            path: 'actualAamount',
            value: this.actualAmount
        });
    }
    if(matchingMergedStrings(this.title+"_", this.userEmail, this.name)){
        throw new mongoose.Error.ValidatorError({
            message: 'Name(key) does not obey the rules!(<title>_<email>)',
            path: 'name',
            value: this.name
        });
    }
});

AccountSchema.post('deleteOne', async function(){
    console.log("INside Post AccountDelete" +this);

    const dbController = new BaseRepository<models.User>(models.UserSchema,"User");
    await dbController.deleteOneDoc({accountName: this.name});
});