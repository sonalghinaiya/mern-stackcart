import { z } from "zod";

export const productCreateSchema = z.object({
    name: z.string().min(2, "Product name is required."),
    price: z.coerce.number().positive("Price must be greater than 0"),
    description: z.string().optional(),
    rating: z.coerce.number().min(0).max(5).optional()
})

export const productUpdateSchema = productCreateSchema.partial();

