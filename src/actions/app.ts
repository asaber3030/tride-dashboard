"use server"

import { cookies } from "next/headers"

import { UserDetails } from "@/types/models"
import { LANGUAGE_COOKIE, API_URL } from "@/lib/constants"
import { api } from "@/services/axios"
import { getToken } from "./auth"

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

export async function exportToExcel(url: string) {
  try {
    const req = await fetch(`${API_URL}/${url}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${(await getToken()) || ""}`
      }
    })
    const data = await req.blob()
    return data
  } catch (error) {
    console.error("Error exporting data:", error)
    const err = error as ApiResponse<any>
    throw new Error(err?.message || "Failed to export data")
  }
}
