"use client"

import { Admin } from "@/types/models"
import { createContext } from "react"

export const AuthContext = createContext<Admin | null>(null)

type AuthProviderProps = {
  value: Admin | null
  children: React.ReactNode
}

export const AuthProvider = ({ value, children }: AuthProviderProps) => {
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
