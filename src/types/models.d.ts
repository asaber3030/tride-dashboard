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

type Admin = {
  id: number
  account: {
    id: number
    email: string
    is_verified: boolean
  }
  first_name: string
  last_name: string
  language: TLanguage
  profile_pic: string | null
  role: {
    id: number
    role_name: string
  }
}

type Role = {
  id: number
  role_name: string
  permissions: Permission[]
  created_at: Date
  updated_at: Date
}

type PermissionRole = {
  id: number
  role_id: number
  permission_id: number
  created_at: Date
  updated_at: Date
}

type Permission = {
  id: number
  role_permission_group: string
  role_permission_name: string
  permissionRole: PermissionRole
  created_at: Date
  updated_at: Date
}

type School = {
  id: number
  school_name: string
  city_id: number
  lat: string
  lng: string
  city: City
}

type City = {
  id: number
  name: string
  governorate_id: number
  governorate: Governorate
}

type Governorate = {
  id: number
  governorate_name: string
}

type Parent = {
  id: number
  name: string
  phone: string
  profile_pic: string
  lat: string
  lng: string
  account: {
    id: number
    email: string
    account_type: string
  }
}

type RideGroup = {
  id: number
  group_name: string
  current_seats_taken: number
  group_type: string
  school: {
    id: number
    school_name: string
  }
}

type Plan = {
  id: number
  range: string
  months_count: number
}

type PaymentHistory = {
  id: number
  paymob_receipt_id: string
  paid_at: string
  amount: string
  parent_subscription_id: number
}

type Payment = {
  id: number
  parent_id: number
  ride_group_id: number
  current_seats_taken: number
  pickup_days_count: number
  started_at: string
  valid_until: string
  remaining_time: number
  plan_id: number
  total_amount: string
  status: string
  parent: Parent
  rideGroup: RideGroup
  plan: Plan
  payment_history: PaymentHistory[]
}
