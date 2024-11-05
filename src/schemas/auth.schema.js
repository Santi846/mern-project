import {z} from 'zod';

export const registerSchema = z.object ({
    username: z.string({required_error:"Username requerido"}),
    email: z.string({required_error:"Email requerido"}).email({message:"Email inválido"}),
    password: z.string({required_error:"Contraseña requerida"}).min(8,{message:"La contraseña debe tener mínimo 8 caracteres"})
});

export const loginSchema = z.object({
    email: z.string({required_error:"Email requerido"}).email({message:"Email inválido"}),
    password: z.string({required_error:"Contraseña requerida"}).min(8,{message:"La contraseña debe tener mínimo 8 caracteres"})
});