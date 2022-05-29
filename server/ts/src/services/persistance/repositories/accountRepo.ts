import { Account, AccountSchema } from "../../../models/account";
import { BaseRepository } from "./baseRepository";
import IBaseRepository from "./baseRepository";
import { AccountDto } from "../../api/dtos/accountDto";
import { CTransactionDto } from "../../api/dtos/transactionDto";

export interface IAccountRepository extends IBaseRepository<Account>{
   getAccountsByUserWithTransactions(email: string) : Promise<AccountDto[]|null>; 
}

export class AccountRepository extends BaseRepository<Account> implements IAccountRepository{
    /**
     *
     */
    constructor() {
        super(AccountSchema, "Account");        
    }
    //Bro this is only one accpount and not all by user!!
    public async getAccountsByUserWithTransactions(email: string): Promise<AccountDto[]|null> {
        var accounts = await this.databaseModel.find({userEmail: email}).lean().exec();

        if(!accounts?.length){
            return Promise.resolve(null);
        }

        let accountDtos: AccountDto[] = [];

        for (let index = 0; index < accounts.length; index++) {
            const singleAccount = accounts[index];
            let transactions = await this.dbModels.transactions.find({accountName: singleAccount.name}).lean().exec();

            let accountDto: AccountDto = {
                title: singleAccount.title,
                incomingAmount: singleAccount.incomingAmount,
                outgoingAmount: singleAccount.outgoingAmount,
                actualAmount: singleAccount.actualAmount,
                userEmail: singleAccount.userEmail,
                transactions: transactions.map(t => new CTransactionDto(t._id.toString(), t.title, t.amount, t.category, t.date, t.accountName, t.outgoing))
            }

            accountDtos.push(accountDto);
        }
               

        return Promise.resolve(accountDtos);
    }

}