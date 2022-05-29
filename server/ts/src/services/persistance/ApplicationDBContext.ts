import mongoose from "mongoose";
import { Account, AccountSchema, Transaction, TransactionSchema, User, UserSchema } from "../../models/allModels";

export class  ApplicationDBContext {

    accounts: mongoose.Model<Account>;
    transactions: mongoose.Model<Transaction>;
    users: mongoose.Model<User>;

    constructor() {
        this.accounts = mongoose.model("Account", AccountSchema);
        this.transactions = mongoose.model("Transaction", TransactionSchema);
        this.users = mongoose.model("User", UserSchema);
    }
}