import z from "zod";


export const signupReq = z.object({
    email:z.string().email(),
    password:z.string().min(8),
    name:z.string().optional()
})

export const signinReq = z.object({
    email:z.string().email(),
    password:z.string().min(8),
})

export const blogInit = z.object({
    title:z.string(),
    content:z.string(),
})

export const blogUpdate = z.object({
    title:z.string(),
    content:z.string(),
    id:z.string()
})

export type SignupReq = z.infer<typeof signupReq>
export type SigninReq = z.infer<typeof signinReq>
export type BlogInit = z.infer<typeof blogInit>
export type BlogUpdate = z.infer<typeof blogUpdate>

