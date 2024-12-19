import express from 'express';
import { register, login, logout, profile } from "../controllers/auth.controller.js";
import { authRequired } from '../middlewares/validateToken.js';
import { validateSchema } from '../middlewares/auth.middleware.js';
import { registerSchema, loginSchema } from '../schemas/auth.schema.js';

const router = express.Router();
//order: route, validation schema, endpoint method
router.post('/register', validateSchema(registerSchema) , register);
router.post('/login', validateSchema(loginSchema), login);
router.post('/logout', logout);
//auth can be re used on different routes as middleware auth
//order: route, validate autentication, endpoint method
router.get('/profile', authRequired, profile);

export default router;