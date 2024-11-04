import express from 'express';
import { register, login, logout, profile } from "../controllers/auth.controller.js";
import { authRequired } from '../middlewares/validateToken.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);
//auth can be re used on different routes as middleware auth
router.get('/profile', authRequired, profile);

export default router;