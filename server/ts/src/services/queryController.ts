import UserModel from '../models/user';
import {User} from '../models/user';

export let setUser = async (user: User): Promise<any> =>{
    try {
        return await UserModel.create(user);
    } catch (error) {
        console.log(error);
        //https://stackoverflow.com/questions/20181517/how-to-check-if-a-promise-returns-an-empty-object
        return Promise.resolve(null);
    }
}
export let getUser = async (user: User): Promise<User|null> => {
    try{
        //https://mongoosejs.com/docs/tutorials/lean.html
        return await UserModel.findOne(user).lean().exec();
        //callback alt. await UserModel.findOne(user, (err, user) => {})
    }catch(error){
        console.log(error);
        return Promise.resolve(null);
    }
}