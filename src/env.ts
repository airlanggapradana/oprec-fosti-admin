import {z} from 'zod';

const envSchema = z.object({
  VITE_BASE_API_URL: z.string()
})

export const {VITE_BASE_API_URL} = envSchema.parse(import.meta.env);