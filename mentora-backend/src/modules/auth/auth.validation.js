const { z } = require("zod");

const signupSchema = z.object({
    name: z
        .string()
        .min(2, "Name must be at least 2 characters long"),
    email: z
        .string()
        .email("Invalid email address"),
    password: z
        .string()
        .min(6)
        .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
        .regex(/[a-z]/, "Password must contain at least one lowercase letter")
        .regex(/[0-9]/, "Password must contain at least one number")
        .regex(/[!@#$%^&*]/, "Password must contain at least one special character"),
    role: z
        .enum(["parent","mentor"],{
            errorMap: ()=> ({message: "Role must be parent or mentor"})
        })
});

const loginSchema = z.object({
    email: z
        .string()
        .email("Invalid email address"),
    password: z
        .string()
        .min(6)
        .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
        .regex(/[a-z]/, "Password must contain at least one lowercase letter")
        .regex(/[0-9]/, "Password must contain at least one number")
        .regex(/[!@#$%^&*]/, "Password must contain at least one special character"),
});

module.exports = {
    signupSchema,
    loginSchema
}
