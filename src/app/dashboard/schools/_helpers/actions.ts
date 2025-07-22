"use server"

import { build } from "search-params"
import { api } from "@/services/axios"

import { SchoolSchema } from "@/schema/models"
import { School } from "@/types/models"
import { z } from "zod"

type GetSchools = PaginatedData<School>

export async function getSchoolsPaginated(searchParams: TObject = {}) {
  try {
    const sp = build(searchParams)
    const url = `/school/paginated?${sp}`
    const req = await api<GetSchools>("GET", url)
    return req.data
  } catch (error) {
    const err = error as ApiResponse<any>
    throw new Error(err?.data?.data?.message || "Failed to fetch schools")
  }
}

export async function createSchoolAction(data: z.infer<typeof SchoolSchema>) {
  try {
    const url = `/school?city_id=${data.city_id}`
    const req = await api<School>("POST", url, data)
    return req
  } catch (error) {
    const err = error as ApiResponse<any>
    throw new Error(err?.data?.data?.message || "Failed to create School")
  }
}

export async function updateSchoolAction(id: number, data: z.infer<typeof SchoolSchema>) {
  try {
    const url = `/school/${id}`
    const req = await api<School>("PUT", url, data)
    return req
  } catch (error) {
    const err = error as ApiResponse<any>
    throw new Error(err?.data?.data?.message || "Failed to update School")
  }
}

export async function deleteSchoolAction(id: number) {
  try {
    const url = `/school/${id}`
    const req = await api<School>("DELETE", url)
    return req
  } catch (error) {
    const err = error as ApiResponse<any>
    throw new Error(err?.data?.data?.message || "Failed to delete School")
  }
}
