import mongoose from 'mongoose';
import { Schema, model} from 'mongoose';

interface Transaction{
    title: String,
    amount: Number,
    category: String,
    date: Date,
    account_name: String,
}

const TransactionSchema = new mongoose.Schema<Transaction>({
    title: {type: String, required: true},
    amount : {type: Number, required: true},
    category: {type: String},
    date: {type: Date},
    account_name: {type: String, required: true}
});

const TransactionModel = model<Transaction>('Transaction', TransactionSchema);
export default TransactionModel;