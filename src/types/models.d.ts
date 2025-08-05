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

id: number
name: string
profile_pic: string
grade: string
gender: string
parent_id: number
type UserDetails = {
  id: number
  account_id: number
  first_name: string
  last_name: string
  language: string
  role_id: number
  profile_pic: string | null
  created_at: string
  updated_at: string
  account: Account
}

type Admin = {
  id: number
  account: Account
  first_name: string
  last_name: string
  language: TLanguage
  profile_pic: string | null
  role: Role
}

type Role = {
  id: number
  role_name: TRoleType
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
  lat: number
  lng: number
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
  account_id: number
  name: string
  profile_pic: string
  phone: string
  google_place_id: string
  lat: string
  lng: string
  formatted_address: string
  city_id: number
  gender: string
  front_side_nic: string
  back_side_nic: string
  face_auth_complete: boolean
  documents_approved: boolean
  documents_approval_date: string | null
  created_at: string
  updated_at: string
  account: Account
  children: Child[]
}

type Child = {
  id: number
  name: string
  profile_pic: string
  grade: string
  gender: string
  parent_id: number
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

export type FullRideGroup = {
  id: number
  parent_creator_id: number
  group_name: string
  created_at: string
  updated_at: string
  driver_id: number
  school_id: number
  current_seats_taken: number
  invite_code: string
  group_type: string
  status: string
  group_plan_id: number | null
  creator: {
    id: number
  }
  parent_group_subscription: {
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
  }[]
  driver: {
    id: number
    account_id: number
    name: string
    profile_pic: string
    phone: string
    license_number: string
    lat: string
    lng: string
    formatted_address: string
    city_id: number
    gender: string
  }
  school: {
    id: number
    school_name: string
    city_id: number
    lat: string
    lng: string
  }
  parentGroups: {
    id: number
    group_id: number
    parent_id: number
    home_lat: string
    home_lng: string
    current_seats_taken: number
    parent: {
      id: number
      account_id: number
      name: string
      profile_pic: string
      phone: string
      google_place_id: string
      lat: string
      lng: string
      formatted_address: string
      city_id: number
      gender: string
      front_side_nic: string
      back_side_nic: string
      face_auth_complete: boolean
      documents_approved: boolean
      documents_approval_date: string
    }
    childDetails: {
      id: number
      parent_group_id: number
      child_id: number
      timing_from: string
      timing_to: string
      child: {
        id: number
        name: string
        profile_pic: string
        grade: string
        gender: string
        parent_id: number
      }
    }[]
  }[]
  dayDates: {
    id: number
    ride_group_detailsid: number
    date_day: string
  }[]
}

type RideGroupLocation = {
  parentGroups: {
    parent_id: number
    home_lat: number
    home_lng: number
    parent: { account_id: number; name: string }
  }[]
}

type DriverPapers = {
  id: number
  driver_id: number
  front_side_national_url: string
  back_side_national_url: string
  car_model: string
  car_model_year: number
  driver_license_url: string
  driver_license_exp_date: Date
  car_license_url: string
  car_license_exp_date: Date
  approved: boolean
  approval_date: Date | null
  face_auth_complete: number
}

type DriverAccount = {
  id: number
  email: string
  account_type: "driver"
  is_verified: boolean
  auth_method: string
}

type Driver = {
  id: number
  account_id: number
  name: string
  profile_pic: string
  phone: string
  license_number: string
  lat: string
  lng: string
  formatted_address: string
  city_id: number
  gender: "male" | "female"
  created_at: string
  updated_at: string
  papers: DriverPapers | null
  account: DriverAccount
}

type ChatMessage = {
  _id: string
  chat_room_id: string
  sender_id: number
  sender_type: TChatMessageSender
  sender_name: string
  type: string
  media_url: string | null
  message: string
  is_system: boolean
  status: TChatMessageStatus
  reply_to: string | null
  is_deleted: boolean
  deleted_at: Date | null
  created_at: Date
  updated_at: Date
}

type ChatParticipant = {
  _id: string
  user_id: number
  user_type: TChatMessageSender
  name: string
  last_seen: Date | null
}

type ChatRoom = {
  _id: string
  room_type: TChatRoomType
  name: string
  participants: ChatParticipant[]
  last_message: ChatMessage | null
  is_active: boolean
  ride_group_id: number
  created_at: Date
  updated_at: Date
  participantsProfilePic: {
    id: number
    parent?: {
      profile_pic: string
    } | null
    driver?: {
      profile_pic: string
    } | null
  }[]
}

type ParentWithGroups = Parent & {
  groups: {
    id: number
    group: {
      school_id: number
      school: {
        school_name: string
      }
    }
  }[]
}
