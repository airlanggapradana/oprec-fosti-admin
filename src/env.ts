import {z} from 'zod';

const envSchema = z.object({
  VITE_BASE_API_URL: z.string(),
  VITE_SERVICE_ID: z.string(),
  VITE_TEMPLATE_ID: z.string(),
  VITE_PUBLIC_KEY: z.string(),
})

export const {VITE_BASE_API_URL, VITE_SERVICE_ID, VITE_TEMPLATE_ID, VITE_PUBLIC_KEY} = envSchema.parse(import.meta.env);