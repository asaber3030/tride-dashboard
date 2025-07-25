"use server"

import { Permission, Role } from "@/types/models"

import { api } from "@/services/axios"
import { getUser } from "./auth"

export async function getRoles() {
  try {
    const request = await api<{ data: Role[] }>("GET", "/roles")
    console.log("Roles fetched successfully:", request.data)
    return request.data.data
  } catch (error) {
    const err = error as ApiResponse<any>
    throw new Error(err?.data?.data?.message || "Failed to fetch roles")
  }
}

export async function getRolePermissions(roleId: number) {
  try {
    const request = await api<{ data: Permission[] }>("GET", `/roles/${roleId}/permissions`)
    return request.data.data
  } catch (error) {
    const err = error as ApiResponse<any>
    throw new Error(err?.data?.data?.message || "Failed to fetch roles")
  }
}

export async function getCurrentRolePermissions() {
  const user = await getUser()
  if (!user) throw new Error("Unauthenticated")

  const roleId = user.role.id
  const permissions = await getRolePermissions(roleId)

  return permissions
}

export async function hasAccessTo(resource: string): Promise<boolean> {
  const permissions = await getCurrentRolePermissions()
  return !!permissions.find((item) => item.role_permission_group == resource)
}

export async function getPermissions() {
  try {
    const request = await api<{ data: Permission[] }>("GET", "/roles/permissions")
    console.log("Permissions fetched successfully:", request.data)
    return request.data.data
  } catch (error) {
    const err = error as ApiResponse<any>
    throw new Error(err?.data?.data?.message || "Failed to fetch Permissions")
  }
}

export async function updateRolePermissionsAction(roleId: number, permissions: number[]) {
  try {
    const request = await api<any>("PATCH", `/roles/${roleId}/permissions`, {
      permissions
    })
    return request
  } catch (error) {
    const err = error as ApiResponse<any>
    throw new Error(err?.data?.data?.message || "Failed to update role permissions")
  }
}
