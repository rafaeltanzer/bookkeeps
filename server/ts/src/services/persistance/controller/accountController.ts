import { BaseRepository } from "../repositories/baseRepository";
import {Account, AccountSchema} from '../../../models/allModels';
import mongoose from "mongoose";
import { UnitOfWork } from "../unitOfWork";
import { CError } from "../../../utils/cError";
import { AccountDto } from "../../api/dtos/accountDto";
import { MongoConnector } from "../../database_logic/databaseUtil";
import { accountRouter } from "../../api/router/accountRouter";

/**
 * Controller classes exist because of contructor DI. The routers themselves are no classes so DI would not be possible, at least ctor-DI woudlnt
 */
export class AccountController{
    /**
     *
     */
    constructor(unitOfWork = new UnitOfWork()) {//ctor-DI in future
        this._unitOfWork = unitOfWork;
    }

    private _unitOfWork: UnitOfWork;

    private _listOfAccountKeys: string[] = ["name", "title", "incomingAmount", "outgoingAmount", "actualAmount"];

    public async findOneDocument(filter: any) : Promise<Account|null>{
        await MongoConnector.connectToDatabase();
        var account = await this._unitOfWork.accounts.findOneDoc(filter);
        MongoConnector.DisconnectFromDatabase();
        if(account === null){
            throw new CError(`No account was found!`, 'NoContent'); 
        }
        return account;
    }

    public async createNewDoument(doc: Account){//BaseController<T> async createNewDOcument(doc: T);
        if(Object.keys(doc).length <= 0)
            throw new CError("Document is empty!");

        await MongoConnector.connectToDatabase();

        await this._unitOfWork.accounts.createNewDoc(doc);

        MongoConnector.DisconnectFromDatabase();
    }

    public async deleteOneDocument(filter: any): Promise<boolean>{
        await MongoConnector.connectToDatabase();
        let deletionHappened = await this._unitOfWork.accounts.deleteOneDoc(filter);
        MongoConnector.DisconnectFromDatabase();
        return deletionHappened;
    }

    public async getAccountsByUserWithTransaction(email: string): Promise<AccountDto[]>{
        if(email === ""){//match with email regex
            throw new CError('The request cannot be resolved-', 'BadRequest');
        }
        await MongoConnector.connectToDatabase();
        var accounts = await this._unitOfWork.accounts.getAccountsByUserWithTransactions(email);
        MongoConnector.DisconnectFromDatabase();
        if(accounts == null){
            throw new CError(`No accounts belonging to ${email} were found!`, 'NoContent');
        }
        return accounts;
    }
}