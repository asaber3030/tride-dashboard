import { z } from "zod"

export const LoginSchema = z.object({
  email: z.string().email("messages.invalidEmail"),
  password: z.string().min(8, "messages.invalidPassword")
})

export const RegisterSchema = z.object({
  name: z.string().min(3, "messages.invalidName"),
  username: z.string().min(3, "messages.invalidUsername"),
  email: z.string().email("messages.invalidEmail"),
  password: z.string().min(8, "messages.invalidPassword"),
  phone_number: z.string().nonempty("messages.invalidPhoneNumber"),
  address: z.string().nonempty("messages.invalidAddress")
})

export const UpdateAccountSchema = z.object({
  email: z.string().email().optional(),
  first_name: z.string().optional(),
  last_name: z.string().optional(),
  language: z.string().optional()
})

export const UpdatePasswordSchema = z.object({
  password: z.string().min(8, "messages.invalidPassword"),
  new_password: z.string().min(8, "messages.invalidNewPassword")
})
