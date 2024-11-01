import userModel from "../models/user.model.js";
import bcryptjs from 'bcryptjs';
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
    const data = req.body;
    const userInfo  = {email:data.email, username:data.username };
    console.log("Received data:", userInfo );
    try {
        const passwordHash = await bcryptjs.hash(data.password, 10)
        const user = {
            username:userInfo .username,
            password:passwordHash,
            email: userInfo .email
        };
        const newUser = new userModel(
            user
        );
        const savedUser = await newUser.save();

        jwt.sign({
            id: savedUser._id
        },
        "secretkey1234",
        {
            expiresIn:"1d"
        },
        (error, token) => {
            error ? console.log("error: ", error) : res.cookie("token", token) && res.json({message:"Usuario creado"})
        }
    );

    } catch (error) {
        console.log("Error: ", error);
        res.status(400).send("Error en el registro");
    }
};

export const login = (req, res) => {
    res.send("Sesión iniciada");
};