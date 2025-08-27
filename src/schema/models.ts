import z from "zod"

export const AdminSchema = z.object({
  email: z.string().email(),
  language: z.string().min(1, "Language is required"),
  first_name: z.string().min(1, "First name is required"),
  last_name: z.string().min(1, "Last name is required"),
  password: z.string().min(6, "Password must be at least 6 characters long")
})

export const UpdateAdminRoleSchema = z.object({
  role_id: z.number().min(1, "Role is required")
})

export const SchoolSchema = z.object({
  school_name: z.string().min(1, "School name is required"),
  city_id: z.number().min(1, "City is required"),
  lat: z.coerce.number(),
  lng: z.coerce.number()
})

export const GovernorateSchema = z.object({
  governorate_name: z.string().min(1, "Governorate name is required")
})

export const CitySchema = z.object({
  name: z.string().min(1, "City name is required"),
  governorate_id: z.number().min(1, "Governorate is required")
})

export const CreateParentSubscriptionSchema = z.object({
  parent_id: z.number().min(1, "Parent ID is required"),
  ride_group_id: z.number().min(1, "Ride group ID is required"),
  plan_id: z.number().min(1, "Plan ID is required"),
  started_at: z.coerce.date().optional(),
  valid_until: z.coerce.date().optional(),
  default: z.boolean().optional().default(false)
})

export const UpdateParentGroupStatus = z.object({
  groupStatus: z.enum(["new", "pending", "expired", "ready", "active", "inactive", "removed"]),
  subscriptionStatus: z.enum(["new", "pending", "paid", "expired"])
})

export const CreateDriverSalarySchema = z.object({
  status: z.enum(["paid", "pending"]),
  salary: z.coerce.number().min(0, "Salary must be a positive number"),
  issued_for: z.coerce.date()
})
