import mongoose from 'mongoose';
import { Schema, model} from 'mongoose';
import { EmailRegEx } from '../services/database_logic/databaseValidation';

export interface User{
    email: String,
    pswd: String,
}

const UserSchema = new mongoose.Schema<User>({
    email: {type: String, required: true, unique: true, match: [EmailRegEx, 'Email is not compliant to the rules!']},
    pswd: {type: String, required: true, minlength: [6, 'Password must be at least 6 chars!']}
});

export const UserModel = model<User>("User", UserSchema);