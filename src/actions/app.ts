"use server"

import { cookies } from "next/headers"

import { LANGUAGE_COOKIE } from "@/lib/constants"

export async function getLanguage(): Promise<string> {
  try {
    const store = await cookies()
    const language = store.get(LANGUAGE_COOKIE)?.value
    return language || "en"
  } catch (error) {
    return "en"
  }
}
