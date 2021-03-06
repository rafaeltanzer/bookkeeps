import mongoose from 'mongoose';
import { Schema, model } from 'mongoose';
import { minExcludeZero } from '../services/database_logic/databaseValidation';
import { CategoryList } from './category.enum';

export interface Transaction {
    _id: mongoose.Types.ObjectId,
    title: string,
    amount: number,
    category: string,
    date: Date,
    accountName: string,
    outgoing: boolean,
}

export const TransactionSchema = new mongoose.Schema<Transaction>({
    _id: {type: Schema.Types.ObjectId},
    title: { type: String, required: true },
    amount: { type: Number, required: true, validate: [minExcludeZero, 'Has to be greater than 0!']},
    category: { type: String, enum: { values: CategoryList, message: '{VALUE} is not found in the list.' } },
    date: { type: Date },
    accountName: { type: String, required: true, unique: true, toLowerCase: true },
    outgoing: {type: Boolean}
});