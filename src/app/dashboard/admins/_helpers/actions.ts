"use server"

import { build } from "search-params"
import { api } from "@/services/axios"
import { z } from "zod"

import { AdminSchema, UpdateAdminRoleSchema } from "@/schema/models"
import { Admin } from "@/types/models"
import { objectToFormData } from "@/lib/utils"

type GetAdmins = {
  admins: Admin[]
}

export async function getAdmins(searchParams: TObject = {}) {
  try {
    const sp = build(searchParams)
    const url = `/admins?${sp}`
    const req = await api<GetAdmins>("GET", url)
    return req.data.admins
  } catch (error) {
    const err = error as ApiResponse<any>
    throw new Error(err?.data?.data?.message || "Failed to fetch admins")
  }
}

export async function createAdminAction(data: z.infer<typeof AdminSchema>, file: File | undefined) {
  try {
    const formData = objectToFormData(data)
    if (file) formData.append("profile_pic", file)
    const req = await api<Admin>("POST", "/admins/create", formData, {
      "Content-Type": "multipart/form-data"
    })
    return req
  } catch (error) {
    const err = error as ApiResponse<any>
    throw new Error(err?.data?.data?.message || "Failed to create admin")
  }
}

export async function updateAdminRoleAction(adminId: number, data: z.infer<typeof UpdateAdminRoleSchema>) {
  try {
    const req = await api<Admin>("PATCH", `/admins/${adminId}/role`, data)
    return req
  } catch (error) {
    const err = error as ApiResponse<any>
    throw new Error(err?.data?.data?.message || "Failed to update admin role")
  }
}
