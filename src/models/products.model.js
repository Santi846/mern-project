import mongoose from "mongoose";
import { Middleware } from "../middlewares/mainMiddleware.js";

const productsSchema = new mongoose.Schema({
    title: {
        type: String,
        required:true,
        trim:true
    },
    description: {
        type:String,
        required:true,
        trim:true,
        unique:true
    },
    stock:{
        type:Number,
        required:true
    },
    prize:{
        type:Number,
        required:true
    },
    weight:{
      type:Number,
      required:true
    },
    amount:{
      type:Number,
      required:true
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required:true
    },
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

Middleware(productsSchema);

export default mongoose.model('Products', productsSchema);