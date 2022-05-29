import * as models from '../../models/allModels';
import * as argon2 from 'argon2';
import { matchingActualAmount, matchingMergedStrings } from './databaseValidation';
import mongoose from 'mongoose';
import { BaseRepository } from '../persistance/repositories/baseRepository';
//create() fires save() hook!

//#region User-Hooks
models.UserSchema.pre('save', async function(){
    console.log("PreSave in User: " + this + "Type =" + typeof this);

    this.pswd = await argon2.hash(this.pswd);
});


//https://www.tabnine.com/code/javascript/functions/mongoose/Schema/post
models.UserSchema.post('deleteOne', async function(){
    console.log("Post delete User middleware..."+ this + "Type = " + typeof this);
    //let userEMail = this.email maybe this refers to the query and not the document
    const dbController = new BaseRepository<models.Account>(models.AccountSchema, "Account");
    await dbController.deleteOneDoc({userMail: this.email});
});
//#endregion


//#region Account-Hooks
models.AccountSchema.pre(['save', 'updateOne'], {document: true, query: false}, async function(){
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

models.AccountSchema.post('deleteOne', async function(){
    console.log("INside Post AccountDelete" +this);

    const dbController = new BaseRepository<models.User>(models.UserSchema,"User");
    await dbController.deleteOneDoc({accountName: this.name});
});
//#endregion