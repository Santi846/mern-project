import {z} from 'zod';

export const registerSchema = z.object ({
    username: z.string({required_error:"Username required"}),
    email: z.string({required_error:"Email required"}).email({message:"Invalid Email"}),
    password: z.string({required_error:"Password required"}).min(8,{message:"Password field must have at least 8 characters"})
});

export const loginSchema = z.object({
    email: z.string({required_error:"Email required"}).email({message:"Invalid Email"}),
    password: z.string({required_error:"Password required"}).min(8,{message:"Password field must have at least 8 characters"})
});