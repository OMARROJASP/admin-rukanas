import { z } from "zod"

export const LoginSchema = z.object({
    email:z.string().email("Deve ser un correo válido"),
    password: z.string().min(6, "La contraseña deve tener al menos 6 caracteres")
})

export type LoginType  = z.infer<typeof LoginSchema>


export const RegisterProductSchema = z.object({
    imageUrl: z.file(),
    name: z.string(),
    price: z.number(),
    description: z.string().max(100, "La descripcion es muy larga mas de 100 caracteres"),
    category: z.number(),
    stock: z.number(),
    supplier: z.number(),
    state: z.boolean(),
})

export type RegisterProductType = z.infer<typeof RegisterProductSchema>