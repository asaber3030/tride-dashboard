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
  lat: z.string().min(1, "Latitude is required"),
  lng: z.string().min(1, "Longitude is required")
})

export const GovernorateSchema = z.object({
  governorate_name: z.string().min(1, "Governorate name is required")
})

export const CitySchema = z.object({
  name: z.string().min(1, "City name is required"),
  governorate_id: z.number().min(1, "Governorate is required")
})
