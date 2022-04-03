import * as models from '../../models/allModels';
import * as db from './databaseMiddleware';
import {model} from 'mongoose';
import {Mixin} from 'ts-mixer';
import mongoose from 'mongoose';


class BaseController<T, K extends mongoose.Schema>{
    //controler with generic input of the Schema or Model itself
    //allows the use of one controller class with all the functionality inside
    //the methods practically stay the same, only the filter has to be given via a parameter of the method
    //e.g. BaseController<AccountModel> no more dependcies if interface is giving alongside with model eg BaseContr<AccountModel, Account>

    /**
     *
     */
    constructor(modelSchema: mongoose.Schema, x: new() => T) {
        console.log("Inside BaseController ctor: Gneric Type name is" + x.name);
        this.databaseModel = mongoose.model<T>(x.name, modelSchema);
    }

    private databaseModel: mongoose.Model<T>;

    setNewDoc = async(doc: T): Promise<any> => { //change any to specific type: look up what create returns
        try {
            return await this.databaseModel.create(doc);
        } catch (error) {
            throw error;
        }
    }
}

//#region User
class UserModelController{

    /**
     *
     */
    constructor() {        
    }

    setUser = async (user: models.User): Promise<any> =>{
        try {
            return await db.UserModel.create(user);
        } catch (error) {
            console.log(error);
            //https://stackoverflow.com/questions/20181517/how-to-check-if-a-promise-returns-an-empty-object
            return Promise.resolve(null);
        }
    }
    getUser = async (user: models.User): Promise<models.User|null> => {
        try{
            //https://mongoosejs.com/docs/tutorials/lean.html
            return await db.UserModel.findOne(user).lean().exec();
            //callback alt. await UserModel.findOne(user, (err, user) => {})
        }catch(error){
            console.log(error);
            return Promise.resolve(null);
        }
    }
}
//#endregion

//#region Account
class AccountModelController{
    setAccount = async (account: models.Account): Promise<any> => {
        try {
            return await db.AccountModel.create(account);
        } catch (error) {
            console.log(`${typeof error} was thrown, creating account. ${error}`);
            throw error;
        }
    }
    getAccounts = async (userEmail: string): Promise<models.Account[]> => {
        try {
            return await db.AccountModel.find({userMail: userEmail}).lean().exec();
        } catch (error) {
            console.log(`${typeof error} was thrown while getting all accounts for ${userEmail}. ${error}`);
            throw new Error();
        }
    } 
    findAccount = async(accountName: string): Promise<models.Account|null> => {
        //https://stackoverflow.com/questions/45172700/what-does-mongoose-return-when-a-find-query-is-empty
        try {
            return await db.AccountModel.findOne({name: accountName}).lean().exec();
        } catch (error) {
            console.log(`${typeof error} was thrown while looking for account ${accountName}. ${error}`);
            throw error;
        }
    }
    deleteAccount = async(accountName: string)=> {
        try {
            await db.AccountModel.deleteOne({name: accountName}).lean().exec()
        } catch (error) {
            console.log(`${typeof error} was thrown while deleting Account: ${accountName}. ${error}`);
            throw error;
        }
    }
    deleteAccountsByUser = async (userEmail: string) => {
        try {
            await db.AccountModel.deleteOne({userMail: userEmail}).lean().exec()
        } catch (error) {
            console.log(`${typeof error} was thrown while deleting Accounts by user ${userEmail}. ${error}`);
            throw error;
        }
    }
}
//#endregion

//#region Transaction
class TransactionModelController{

}
//#endregion

class DatabaseController extends Mixin(UserModelController, AccountModelController){

}