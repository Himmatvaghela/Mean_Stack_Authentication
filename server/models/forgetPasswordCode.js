// models/VerificationCode.js

import mongoose from 'mongoose';
const { Schema }=mongoose;

const forgetPasswordCodeSchema = new Schema({
  userEmail: { type: String, required: true },
  code: { type: Number, required: true },
  expirationTime: { type: Date, required: true },
});

const ForgetPasswordCode = mongoose.model('ForgetPasswordCode', forgetPasswordCodeSchema);

export default ForgetPasswordCode;
