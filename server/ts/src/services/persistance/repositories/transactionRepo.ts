import { Transaction } from "../../../models/transaction";
import { BaseRepository } from "./baseRepository";
import IBaseRepository from "./baseRepository";

export interface ITransactionRepository extends IBaseRepository<Transaction>{
    
}

export class TransactionRepository extends BaseRepository<Transaction> implements ITransactionRepository{

}