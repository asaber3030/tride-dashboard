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
