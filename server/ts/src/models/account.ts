import mongoose from 'mongoose';
import { Schema, model} from 'mongoose';

export interface Account{
    name: String,
    title: String,
    income: number,
    outgoing: number,
    actualAmount: number,
}

const AccountSchema = new mongoose.Schema<Account>({
    name: {type: String, required: true, unique: true},//title+email
    title: {type: String, required: true, unique: true},
    income:{ type: Number},
    outgoing: {type: Number},
    actualAmount: {type: Number}
});

export const AccountModel = model<Account>('Account', AccountSchema);