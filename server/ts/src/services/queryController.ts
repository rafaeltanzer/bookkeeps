import * as db from '../models/allModels';

export let setUser = async (user: db.User): Promise<any> =>{
    try {
        return await db.UserModel.create(user);
    } catch (error) {
        console.log(error);
        //https://stackoverflow.com/questions/20181517/how-to-check-if-a-promise-returns-an-empty-object
        return Promise.resolve(null);
    }
}
export let getUser = async (user: db.User): Promise<db.User|null> => {
    try{
        //https://mongoosejs.com/docs/tutorials/lean.html
        return await db.UserModel.findOne(user).lean().exec();
        //callback alt. await UserModel.findOne(user, (err, user) => {})
    }catch(error){
        console.log(error);
        return Promise.resolve(null);
    }
}

export let setAccount = async (account: db.Account): Promise<any> => {
    try {
        return await db.AccountModel.create(account);
    } catch (error) {
        console.log(error);
        return Promise.resolve(null);
    }
}
export let getAccounts = async (): Promise<db.Account[]|null> => {
    try {
        return await db.AccountModel.find({}).lean().exec();
    } catch (error) {
        console.log(error);
        return Promise.resolve(null);
    }
}
export let findAccount = async(name: string): Promise<db.Account|null> => {
    //https://stackoverflow.com/questions/45172700/what-does-mongoose-return-when-a-find-query-is-empty
    try {
        return await db.AccountModel.findOne({name: name}).exec();
    } catch (error) {
        console.log(error);
        return Promise.resolve(null);
    }
}