"use server"

import { cookies } from "next/headers"

import { UserDetails } from "@/types/models"
import { LANGUAGE_COOKIE } from "@/lib/constants"
import { api } from "@/services/axios"

export async function getLanguage(): Promise<string> {
  try {
    const store = await cookies()
    const language = store.get(LANGUAGE_COOKIE)?.value
    return language || "en"
  } catch (error) {
    return "en"
  }
}

export async function getUserDetails(id: number, type: string) {
  try {
    const url = `/users/${id}/${type}`
    const req = await api<UserDetails>("GET", url)
    return req.data
  } catch (error) {
    const err = error as ApiResponse<any>
    throw new Error(err?.data?.data?.message || "Failed to fetch user details")
  }
}
