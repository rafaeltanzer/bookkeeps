import { Account } from "../../../models/account";
import { BaseRepository } from "../../database_logic/databaseRepository";
import { AccountController } from "../controller/accountController";

export interface IAccountRepository{
    
}

export class AccountRepository extends BaseRepository<Account>{

}