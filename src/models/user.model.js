import mongoose from "mongoose";
import { Middleware } from "../middlewares/mainMiddleware.js";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required:true,
        trim:true
    },
    email: {
        type:String,
        required:true,
        trim:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    }
    ,
  createdAt: {
    allowNull: false,
    type: Date
  },
  updatedAt: {
    allowNull: false,
    type: Date
  }
},
  {
    timestamps: true
  }
);

Middleware(userSchema);

export default mongoose.model('User', userSchema);