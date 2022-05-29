import mongoose from 'mongoose';
import { Schema, model} from 'mongoose';
import { EmailRegEx } from '../services/database_logic/databaseValidation';
import * as argon2 from 'argon2';
import * as models from './allModels';
import { BaseRepository } from '../services/persistance/repositories/baseRepository';

export interface User{
    email: string,
    pswd: string,
}

export const UserSchema = new mongoose.Schema<User>({
    email: {type: String, required: true, unique: true, match: [EmailRegEx, 'Email is not compliant to the rules!']},
    pswd: {type: String, required: true, minlength: [6, 'Password must be at least 6 chars!']}
});

UserSchema.pre('save', async function(){
    console.log("PreSave in User: " + this + "Type =" + typeof this);

    this.pswd = await argon2.hash(this.pswd);
});


//https://www.tabnine.com/code/javascript/functions/mongoose/Schema/post
UserSchema.post('deleteOne', async function(){
    console.log("Post delete User middleware..."+ this + "Type = " + typeof this);
    //let userEMail = this.email maybe this refers to the query and not the document
    const dbController = new BaseRepository<models.Account>(models.AccountSchema, "Account");
    await dbController.deleteOneDoc({userMail: this.email});
});