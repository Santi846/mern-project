import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        await mongoose.connect('mongodb://localhost/merndb');
        console.log("Todo ok");
        return;
    } catch (error) {
        console.log("El error es: ", error);
        return;
    }
};