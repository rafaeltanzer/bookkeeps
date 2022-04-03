import * as models from '../../models/allModels';
import * as argon2 from 'argon2';
import {model, Error} from 'mongoose';
import { matchingActualAmount } from './databaseValidation';
import mongoose from 'mongoose';
//create() fires save() hook!

//#region User-Hooks
models.UserSchema.pre('save', async function(){
    this.pswd = await argon2.hash(this.pswd);
});
//#endregion
//#region Account-Hooks
models.AccountSchema.pre(['save', 'updateOne'], {document: true, query: false}, async function(){
    if(!(await matchingActualAmount(this.incomingAmount, this.outgoingAmount, this.actualAmount)))
    {
        throw new mongoose.Error.ValidatorError({
            message: 'Actual amount does not match with ongoing transactive amounts!',
            path: 'actualAamount',
            value: this.actualAmount
        });
    }
});
//#endregion

export const UserModel = model<models.User>("User", models.UserSchema);
export const TransactionModel = model<models.Transaction>('Transaction', models.TransactionSchema);
export const AccountModel = model<models.Account>('Account', models.AccountSchema);