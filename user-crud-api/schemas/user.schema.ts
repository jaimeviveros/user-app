import mongoose from "mongoose";
const { Schema } = mongoose;

export const userSchema = new Schema({
  fullname:  { type: String, required: true },
  email:  { type: String, required: true },
  username:  { type: String, required: true },
  password:  { type: String, required: true },
  date: { type: Date, default: Date.now },
});


export const UserModel = mongoose.model('UserModel', userSchema);
