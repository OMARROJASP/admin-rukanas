import { z } from "zod"

export const LoginSchema = z.object({
    email:z.string().email("Deve ser un correo válido"),
    password: z.string().min(6, "La contraseña deve tener al menos 6 caracteres")
})

export type LoginType  = z.infer<typeof LoginSchema>


export const ProductSchema = z.object({
    name: z.string().min(3, "El nombre debe tener al menos 3 caracteres"),
    price: z.coerce.number().positive("El precio debe ser mayor a 0"),
    description: z.string().min(5, "La descripción es obligatoria"),
    category: z.coerce.number().int().positive("Selecciona una categoría válida"),
    stock: z.coerce.number().int().min(0, "El stock no puede ser negativo"),
    supplier: z.coerce.number().int().positive("Selecciona un proveedor válido"),
    state: z.string().min(1, "Selecciona el estado"),
    ofert: z.coerce.number().int().min(0, "La oferta no puede ser negativa"),

    image: z
    .any()
    .refine(
        (file) =>
        file instanceof FileList &&
        file.length > 0 &&
        file[0].type.startsWith("image/"),
        { message: "El archivo debe ser una imagen válida" }
    ),
})

export type ProductType = z.infer<typeof ProductSchema>