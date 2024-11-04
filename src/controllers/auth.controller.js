import userModel from "../models/user.model.js";
import bcryptjs from 'bcryptjs';
import { createAccessToken } from "../libs/jwt.js";

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

        const token = await createAccessToken({id: savedUser._id});

        res.cookie("token", token) && res.json({message:"Usuario creado"})

    } catch (error) {
        console.log("Error: ", error);
        res.status(400).send("Error en el registro");
    }
};

export const login = async (req, res) => {
    const data = req.body;
    const userInfo  = {email:data.email, password:data.password };

    console.log("data que envio", userInfo);
    
    try {
        
        const user = userInfo.email;
        const userPass = userInfo.password;

        console.log("data que paso", user);

        const userFound = await userModel.findOne({email:user});
        
        console.log("back response: ",userFound);

        if (!userFound) {
            return res.status(400).json({messaje:"user not found"})
        }
        else {
            const isMatch = await bcryptjs.compare(userPass, userFound.password);

            if(!isMatch) {
                return res.status(400).json({messaje:"Incorrecta passsword"})
            }
            else{
                const token = await createAccessToken({id: userFound._id});
                res.cookie("token", token) && res.json({message:"Sesión iniciada"});
            }
        }
    } catch (error) {
        console.log("Error: ", error);
        res.status(400).send("Error en el inicio");
    }
};

export const logout = (req, res) => {
    res.cookie('token', '', {expires : new Date(0)});
    return res.status(200).json("Sesión cerrada");
};

export const profile = async (req, res) => {
    const userMatch = await userModel.findById(req.user.id);
    console.log("yes", userMatch);
    if(!userMatch) {
        return res.status(400).json({messaje:"Usuario no encontrado"})
    }
    else{
        
        return res.json({
            id: userMatch._id,
            email:userMatch.email,
            username: userMatch.username,
            createdAt: userMatch.createdAt,
            updatedAt: userMatch.createdAt
        });
        
    }
   
};