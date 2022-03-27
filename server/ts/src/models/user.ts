import mongoose from 'mongoose';
import { Schema, model} from 'mongoose';

export interface User{
    email: String,
    pswd: String,
}

const UserSchema = new mongoose.Schema<User>({
    email: {type: String, required: true, unique: true},
    pswd: {type: String, required: true}
});

const UserModel = model<User>("User", UserSchema);
export default UserModel;