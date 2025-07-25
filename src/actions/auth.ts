"use server"

import { AUTH_COOKIE } from "@/lib/constants"
import { LoginSchema } from "@/schema/auth"

import { cookies } from "next/headers"
import { api } from "@/services/axios"
import { z } from "zod"

import { Admin, LoginData, User } from "@/types/models"
import { redirect } from "next/navigation"
import routes from "@/lib/routes"

type LoginResponse = {
  token: string
  account: User
}

type LoginProps = {
  data: LoginData
  rememberMe?: boolean
  accountType?: TAccountType
  deviceToken?: string
  redirectUrl?: string
}

export async function getToken(): Promise<string | undefined> {
  const token = (await cookies()).get(AUTH_COOKIE)?.value
  return token
}

export async function getUser(): Promise<Admin | null> {
  try {
    const response = await api<Admin>("GET", "/admins/me")
    return response.data
  } catch (error: any) {
    return null
  }
}

export async function loginAction({ data, rememberMe = true, deviceToken = " ", accountType = "admin", redirectUrl = routes.dashboard }: LoginProps): Promise<ApiResponse<LoginResponse>> {
  try {
    const request = await api<LoginResponse>("POST", "/auth/login", {
      ...data,
      account_type: accountType,
      device_token: deviceToken
    })
    const cookieStore = await cookies()
    const expiration = rememberMe ? new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) : undefined
    cookieStore.set(AUTH_COOKIE, request.data.token, {
      expires: expiration
    })
    return request
  } catch (error: any) {
    throw new Error(error?.message || "An error occurred during login")
  }
}

export async function logoutAction(): Promise<void> {
  const cookieStore = await cookies()
  cookieStore.delete(AUTH_COOKIE)
  return redirect(routes.login)
}
