import mongoose from 'mongoose';
import { Schema, model} from 'mongoose';
import { minExcludeZero } from '../services/database_logic/databaseValidation';

export interface Account{
    name: String,
    title: String,
    incomingAmount: number,
    outgoingAmount: number,
    actualAmount: number,
}

const AccountSchema = new mongoose.Schema<Account>({
    name: {type: String, required: true, unique: true, toLowerCase: true},//title+email
    title: {type: String, required: true, unique: true, minlength: [2, 'Title must be at least 2 letters!']},
    incomingAmount:{ type: Number, min: 0},
    outgoingAmount: {type: Number, min: 0},
    actualAmount: {type: Number}
});

export const AccountModel = model<Account>('Account', AccountSchema);