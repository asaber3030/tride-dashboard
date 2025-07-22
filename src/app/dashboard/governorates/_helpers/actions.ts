"use server"

import { build } from "search-params"
import { api } from "@/services/axios"

import { Governorate } from "@/types/models"
import { z } from "zod"
import { GovernorateSchema } from "@/schema/models"

type GetGovernorates = PaginatedData<Governorate>

export async function getGovernoratesPaginated(searchParams: TObject = {}) {
  try {
    const sp = build(searchParams)
    const url = `/governorate/paginated?${sp}`
    const req = await api<GetGovernorates>("GET", url)
    return req.data
  } catch (error) {
    const err = error as ApiResponse<any>
    throw new Error(err?.data?.data?.message || "Failed to fetch Governorates")
  }
}

export async function getGovernorates(searchParams: TObject = {}) {
  try {
    const sp = build(searchParams)
    const url = `/governorate?${sp}`
    const req = await api<{ data: Governorate[] }>("GET", url)
    return req.data.data
  } catch (error) {
    const err = error as ApiResponse<any>
    throw new Error(err?.data?.data?.message || "Failed to fetch Governorates")
  }
}

export async function createGovernorateAction(data: z.infer<typeof GovernorateSchema>) {
  try {
    const url = `/governorate`
    const req = await api<Governorate>("POST", url, data)
    return req
  } catch (error) {
    const err = error as ApiResponse<any>
    throw new Error(err?.data?.data?.message || "Failed to create Governorate")
  }
}

export async function updateGovernorateAction(id: number, data: z.infer<typeof GovernorateSchema>) {
  try {
    const url = `/governorate/${id}`
    const req = await api<Governorate>("PUT", url, data)
    return req
  } catch (error) {
    const err = error as ApiResponse<any>
    throw new Error(err?.data?.data?.message || "Failed to update Governorate")
  }
}

export async function deleteGovernorateAction(id: number) {
  try {
    const url = `/governorate/${id}`
    const req = await api<Governorate>("DELETE", url)
    return req
  } catch (error) {
    const err = error as ApiResponse<any>
    throw new Error(err?.data?.data?.message || "Failed to delete Governorate")
  }
}
