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
    category: { type: String, enum: { values: CategoryList, message: '{VALUE} does not exist as a category.' } },
    date: { type: Date },
    accountName: { type: String, required: true, toLowerCase: true },
    outgoing: {type: Boolean}
});