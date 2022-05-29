import mongoose from 'mongoose';
import { CError, DatabaseRecordError } from '../../../utils/cError';
import {generateCustomError, MongoConnector} from '../../database_logic/databaseUtil';
import { ApplicationDBContext } from '../ApplicationDBContext';

export default interface IBaseRepository<T>{
    createNewDoc(doc: T): Promise<T>;
    findOneDoc(filter: any): Promise<T|null>;
    findDocs(filter: any): Promise<T[]|null>;
    deleteOneDoc(filter: any): Promise<boolean>;
    deleteDocs(filter: any): void;
    updateDoc(filter: any, updatedDoc: T): Promise<T|null>
}

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
        this.databaseModel = mongoose.model<T>(modelName, modelSchema);// Are hooks saved in the models. As hooks have to be compiled before .model is called!!!
        this.dbModels = new ApplicationDBContext();
    }

    protected databaseModel: mongoose.Model<T>;
    protected dbModels: ApplicationDBContext;// DependencyINjection

    createNewDoc = async(doc: T): Promise<T> => { //change any to specific type: look up what create returns        
        try {
            return await this.databaseModel.create(doc);
        } catch (error) {
            console.log("CreateNewDoc :: ERROR");
            let customError: DatabaseRecordError|null = generateCustomError(error);
            console.log("LOGGER:: CreateNew in Catch: " + customError);
            throw customError;
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
    deleteOneDoc = async (filter: any): Promise<boolean> => {
        try {
            const deleteRes = await this.databaseModel.deleteOne(filter).exec();
            if(deleteRes.deletedCount === 0){
                return Promise.resolve(false);
            }
            return Promise.resolve(deleteRes.acknowledged);
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