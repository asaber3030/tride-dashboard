"use server"

import { ApiError, ApiResponse, LoginData, LoginResponse, RegisterData } from "@/types/default"
import { API_URL, AUTH_COOKIE } from "@/lib/constants"

import { cookies } from "next/headers"

export async function getToken(): Promise<string | undefined> {
  const token = (await cookies()).get(AUTH_COOKIE)?.value
  return token
}
