import { AccountSchema } from "../../models/account";
import { TransactionSchema } from "../../models/transaction";
import { UserSchema } from "../../models/user";
import { AccountRepository, IAccountRepository } from "./repositories/accountRepo";
import { AuthRepository, IAuthRepository } from "./repositories/authRepo";
import { ITransactionRepository, TransactionRepository } from "./repositories/transactionRepo";

export interface IUnitOfWork{
    accounts: IAccountRepository;
    transactions: ITransactionRepository;
    auth: IAuthRepository;
}

export class UnitOfWork implements IUnitOfWork{
    /**
     *
     */
    constructor() {
        this.accounts = new AccountRepository(/*AccountSchema, 'Account'*/);
        this.transactions = new TransactionRepository(TransactionSchema, 'Transaction');
        this.auth = new AuthRepository(UserSchema, 'User');
    }

    public accounts: IAccountRepository;
    public transactions: ITransactionRepository;
    public auth: IAuthRepository;
}