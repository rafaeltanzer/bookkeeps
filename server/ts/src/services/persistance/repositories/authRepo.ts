import { User } from "../../../models/user";
import { BaseRepository } from "./baseRepository";
import IBaseRepository from "./baseRepository";

export interface IAuthRepository extends IBaseRepository<User>{
    
}

export class AuthRepository extends BaseRepository<User> implements IAuthRepository{

}