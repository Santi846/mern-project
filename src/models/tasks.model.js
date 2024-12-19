import mongoose from "mongoose";
import { Middleware } from "../middlewares/mainMiddleware.js";

const tasksSchema = new mongoose.Schema({
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
    state:{
        type:String,
        required:true,
        default: "Todo"
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

Middleware(tasksSchema);

export default mongoose.model('Tasks', tasksSchema);