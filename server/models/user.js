import mongoose from 'mongoose';
const { Schema } = mongoose;

const UserSchema = new Schema({
  name:String,
  job:String,
  email:String,
  password:String
});


const User = mongoose.model('User',UserSchema)
export default User;