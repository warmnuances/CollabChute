import mongoose, {Document, Schema} from 'mongoose';

export interface IUser extends Document{
  email:string,
  password:string,
  name:string,
  username:string,
}

const UserSchema:Schema = new Schema({
  name:{
    type: String ,
    required: true
  },
  password:{
    type: String ,
    required: true
  },
  email:{
    type: String ,
    required: true,
    unique: true,
    index: true
  },
  username:{
    type: String ,
    required: true
  }
})


export default mongoose.model<IUser>('User',UserSchema)