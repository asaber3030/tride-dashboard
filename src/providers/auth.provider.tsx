"use client"

import { LoginResponse } from "@/types/default"
import { createContext } from "react"

export const UserContext = createContext<LoginResponse | null>(null)

type AuthProviderProps = {
  value: LoginResponse | null
  children: React.ReactNode
}

export const AuthProvider = ({ value, children }: AuthProviderProps) => {
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}
