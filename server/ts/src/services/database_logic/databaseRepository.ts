import {model} from 'mongoose';
import mongoose from 'mongoose';
import {generateCustomError} from './databaseUtil';
import IBaseRepository from '../api/repositories/baseRepository';

/**
 * Database controller class for any possible MongoDB-Model Interface.
 * T is the interface which acts as the model contract between the server and database.
 * modelSchema represents the underlying schema of the model and modelName is the name of the model.
 * Sadly due to not yet existing Gneric type reflection.
 */
export class BaseRepository<T> implements IBaseRepository<T>{
    //controler with generic input of the Schema or Model itself
    //allows the use of one controller class with all the functionality inside
    //the methods practically stay the same, only the filter has to be given via a parameter of the method
    //e.g. BaseController<AccountModel> no more dependcies if interface is giving alongside with model eg BaseContr<AccountModel, Account>

    /**
     *
     */
    constructor(modelSchema: mongoose.Schema, modelName: string) {
        console.log('Inside BaseModelController.')
        this.databaseModel = mongoose.model<T>(modelName, modelSchema);
    }

    private databaseModel: mongoose.Model<T>;

    createNewDoc = async(doc: T): Promise<T> => { //change any to specific type: look up what create returns
        try {
            return await this.databaseModel.create(doc);
        } catch (error) {
            throw error;
        }
    }
    findOneDoc = async (filter: any): Promise<T|null> => {
        try{
            //https://mongoosejs.com/docs/tutorials/lean.html
            var doc = await this.databaseModel.findOne<T>(filter).exec();// HydratedDoc can selfCast into underlaying interface?
            return doc;
            //callback alt. await UserModel.findOne(user, (err, user) => {})
        }catch(error){
            console.log(error);
            throw generateCustomError(error);
        }
    }
    findDocs = async (filter: any): Promise<T[]|null> => {
        try {
            return await this.databaseModel.find(filter).exec();
        } catch (error) {
            throw generateCustomError(error);
        }
    }
    deleteOneDoc = async (filter: any) => {
        try {
            await this.databaseModel.deleteOne(filter).exec();
        } catch (error) {
            throw generateCustomError(error);
        }
    }
    deleteDocs = async (filter: any) => {
        try {
            await this.databaseModel.remove(filter).exec();
        } catch (error) {
            throw generateCustomError(error);
        }
    }
    updateDoc = async (filter: any, update: T): Promise<T|null> => {
        try {
            return await this.databaseModel.findOneAndUpdate(filter, update, {new: true}).exec();
        } catch (error) {
            throw generateCustomError(error);
        }
    }
}

// /*
// class UserModelController{

//     /**
//      *
//      */
//     constructor() {        
//     }

//     setUser = async (user: models.User): Promise<any> =>{
//         try {
//             return await db.UserModel.create(user);
//         } catch (error) {
//             console.log(error);
//             //https://stackoverflow.com/questions/20181517/how-to-check-if-a-promise-returns-an-empty-object
//             return Promise.resolve(null);
//         }
//     }
//     getUser = async (user: models.User): Promise<models.User|null> => {
//         try{
//             //https://mongoosejs.com/docs/tutorials/lean.html
//             var doc = await db.UserModel.findOne(user).exec();
//             return doc;
//             //callback alt. await UserModel.findOne(user, (err, user) => {})
//         }catch(error){
//             console.log(error);
//             return Promise.resolve(null);
//         }
//     }
// }
// //#endregion

// //#region Account
// class AccountModelController{
//     setAccount = async (account: models.Account): Promise<any> => {
//         try {
//             return await db.AccountModel.create(account);
//         } catch (error) {
//             console.log(`${typeof error} was thrown, creating account. ${error}`);
//             throw error;
//         }
//     }
//     getAccounts = async (userEmail: string): Promise<models.Account[]> => {
//         try {
//             return await db.AccountModel.find({userMail: userEmail}).lean().exec();
//         } catch (error) {
//             console.log(`${typeof error} was thrown while getting all accounts for ${userEmail}. ${error}`);
//             throw new Error();
//         }
//     } 
//     findAccount = async(accountName: string): Promise<models.Account|null> => {
//         //https://stackoverflow.com/questions/45172700/what-does-mongoose-return-when-a-find-query-is-empty
//         try {
//             return await db.AccountModel.findOne({name: accountName}).lean().exec();
//         } catch (error) {
//             console.log(`${typeof error} was thrown while looking for account ${accountName}. ${error}`);
//             throw error;
//         }
//     }
//     deleteAccount = async(accountName: string)=> {
//         try {
//             await db.AccountModel.deleteOne({name: accountName}).lean().exec()
//         } catch (error) {
//             console.log(`${typeof error} was thrown while deleting Account: ${accountName}. ${error}`);
//             throw error;
//         }
//     }
//     deleteAccountsByUser = async (userEmail: string) => {
//         try {
//             await db.AccountModel.deleteOne({userMail: userEmail}).lean().exec()
//         } catch (error) {
//             console.log(`${typeof error} was thrown while deleting Accounts by user ${userEmail}. ${error}`);
//             throw error;
//         }
//     }
// }
// //#endregion

// //#region Transaction
// class TransactionModelController{

// }
// //#endregion

// // class DatabaseController extends Mixin(UserModelController, AccountModelController){

// // }