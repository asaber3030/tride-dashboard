"use server"

import { api } from "@/services/axios"
import { Plan } from "@/types/models"
import { ApiError } from "next/dist/server/api-utils"

export async function getAllPlans() {
  try {
    const req = await api<{ data: Plan[] }>("GET", "/admin/plans")
    return req.data.data
  } catch (error) {
    console.error("Failed to fetch plans:", error)
    const err = error as ApiError
    throw new Error(err?.message || "Failed to fetch plans")
  }
}
