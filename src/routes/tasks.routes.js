import express from 'express';
import { authRequired } from '../middlewares/validateToken.js';
import { getTasks, getUniqueTask, createTask, updateTask, deleteTask } from '../controllers/tasks.controller.js';

const Tasksrouter = express.Router();

//auth can be re used on different routes as middleware auth
Tasksrouter.get('/Tasks', authRequired, getTasks);
Tasksrouter.get('/Task/:id', authRequired, getUniqueTask);
Tasksrouter.post('/Task', authRequired, createTask);
Tasksrouter.delete('/Task/:id', authRequired, deleteTask);
Tasksrouter.put('/Task/:id', authRequired, updateTask);

export default Tasksrouter;