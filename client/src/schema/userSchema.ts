import { z } from "zod"


export const userSignupSchema = z.object({
    username: z.string().min(1, "Username must be at least 1 characters long"),
    email: z.email("Invalid email address"),
    password: z.string().min(4, "Password must be at least 4 characters long"),
    contact: z.string().min(10, "Contact must be at least 10 characters long").max(10, "Contact must be at most 10 characters long"),
})

export type SignupInputState = z.infer<typeof userSignupSchema>;


export const userLoginSchema = z.object({
    email: z.email("Invalid email address"),
    password: z.string().min(4, "Password must be at least 4 characters long"),
})


export type LoginInputState = z.infer<typeof userLoginSchema>;