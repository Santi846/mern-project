import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        await mongoose.connect('mongodb://localhost/merndb');
        console.log("Conectado a la base");
        return;
    } catch (error) {
        console.log("El error es: ", error);
        return;
    }
};