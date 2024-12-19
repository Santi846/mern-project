import { z } from 'zod';

export const createTaskSchema = z.object({
    title: z.string({required_error:"Title required"}),
    description: z.string({required_error:"Description must be a string"}).optional()
});

export const existingtaskSchema = z.object({
    title: z.string({required_error:"Title required"}),
    description: z.string({required_error:"Description must be a string"}).optional(),
    state: z.enum(["Todo","Progress", "Done"], { required_error: "State must be 'Todo','Progress' or 'Done'" })
});