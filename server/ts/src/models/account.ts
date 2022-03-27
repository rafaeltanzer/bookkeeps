import mongoose from 'mongoose';
import { Schema, model} from 'mongoose';

interface Account{
    name: string,
    income: number,
    outgoing: number,
    actualAmount: number,
}

const AccountSchema = new mongoose.Schema<Account>({
    name: {type: String, required: true, unique: true},
    income:{ type: Number},
    outgoing: {type: Number},
    actualAmount: {type: Number}
});

const AccountModel = model<Account>('Account', AccountSchema);
export default AccountModel;