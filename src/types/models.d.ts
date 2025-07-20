import { z } from "zod"
import { Timestamps } from "./default"

import { LoginSchema, RegisterSchema } from "@/schema/auth"

type LoginData = z.infer<typeof LoginSchema>
type RegisterData = z.infer<typeof RegisterSchema>

type User = {
  id: string
  email: string
  profileComplete: boolean
  is_verified: boolean
  accountType: TAccountType
}
