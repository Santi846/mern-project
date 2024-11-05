import tasksModel from '../models/tasks.model.js';
import bcryptjs from 'bcryptjs';
import { createAccessToken } from "../libs/jwt.js";


export const getTasks = async (req, res) => {
    try {
        const tasks = await tasksModel.find({user:req.user.id});
        if(tasks){
            console.log("Obtención de tareas exitosa");
            res.json({message:"Tareas existentes", tasks});
        }
        else{
            console.log("No se pudieron obtener tareas");
        }
    } catch (error) {
        console.log("Error: ", error);
        res.status(400).send("Error al solicitar las tareas existentes");
    }
};

export const getUniqueTask = async (req, res) => {

   try {
    const task = await tasksModel.findById(req.params.id);
    console.log("data", task);
    if(task){
        console.log("Obtención de tarea exitosa");
        res.json({message:"Tarea coincidente", task});
    }
    else{
        console.log("No se pudo obtener la tarea solicitada");
    }
   } catch (error) {
    console.log("Error: ", error);
    res.status(400).send("Error al encontrar la tarea solicitada");
   }
};



export const createTask = async (req, res) => {

    const {title, description, state} = req.body;

   try {
    const newTask = new tasksModel({
        title,
        description,
        state,
        user: req.user.id
    });

    const taskSaved = await newTask.save();

    if(taskSaved){
        res.json({message:"Tarea creada con exito", taskSaved});
    }
    else{

    }
   } catch (error) {
    console.log("Error: ", error);
    res.status(400).send("Error en la creación de una tarea");
   }
};

export const updateTask = async (req, res) => {
    try {
        //identifier, data
        const task = await tasksModel.findByIdAndUpdate(req.params.id, req.body, {new:true});
        if(task){
            console.log("Actualización de tarea exitosa");
            res.json({message:"Tarea actualizada", task});
        }
        else{
            console.log("No se pudo actualizar la tarea solicitada");
        }
       } catch (error) {
        console.log("Error: ", error);
        res.status(400).send("Error al encontrar la tarea a actualizar");
    }
};

export const deleteTask = async (req, res) => {
    try {
        const task = await tasksModel.findByIdAndDelete(req.params.id);
        if(task){
            console.log("Eliminación de tarea exitosa");
            return res.sendStatus(204);
        }
        else{
            console.log("No se pudo eliminar la tarea solicitada");
        }
       } catch (error) {
        console.log("Error: ", error);
        res.status(400).send("Error al encontrar la tarea a eliminar");
    }
};