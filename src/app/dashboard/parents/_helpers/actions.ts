"use server"

import { build } from "search-params"
import { api } from "@/services/axios"

import { FullRideGroup, Parent, ParentWithGroups } from "@/types/models"
import { API_URL } from "@/lib/constants"
import { getToken } from "@/actions/auth"
import axios from "axios"

type GetParents = {
  rows: ParentWithGroups[]
  count: number
  hasNextPage: boolean
  hasPreviousPage: boolean
}

type GetParentRideGroups = {
  rows: FullRideGroup[]
  count: number
  hasNextPage: boolean
  hasPreviousPage: boolean
}

export async function getParentsPaginated(searchParams: TObject = {}): Promise<GetParents> {
  try {
    const sp = build(searchParams)
    const req = await api<GetParents>("GET", `/admins/parents?${sp}`)
    return req.data
  } catch (error) {
    const err = error as ApiResponse<any>
    throw new Error(err?.data?.data?.message || "Failed to fetch parents")
  }
}

export async function getParent(parentId: number): Promise<Parent> {
  try {
    const req = await api<Parent>("GET", `/admins/parents/${parentId}`)
    return req.data
  } catch (error) {
    const err = error as ApiResponse<any>
    throw new Error(err?.data?.data?.message || "Failed to fetch parent")
  }
}

export async function getParentRideGroups(parentId: number) {
  try {
    const req = await api<GetParentRideGroups>("GET", `/admins/parents/${parentId}/ride-groups`)
    return req.data
  } catch (error) {
    const err = error as ApiResponse<any>
    throw new Error(err?.data?.data?.message || "Failed to fetch parent")
  }
}

export async function updateParentPapersStatusAction(parentId: number, status: boolean) {
  try {
    const url = `/admins/parents/${parentId}`
    const req = await api<any>("PATCH", url, {
      documents_approved: status
    })
    return req
  } catch (error) {
    console.error("Error updating parent papers status:", error)
    const err = error as ApiResponse<any>
    throw new Error(err?.data?.message || "Failed to update parent status")
  }
}

export async function exportParents() {
  try {
    const url = `${API_URL}/admins/parents/export`
    const req = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${(await getToken()) || ""}`
      }
    })
    const data = await req.blob()
    return data
  } catch (error) {
    console.error("Error exporting parents:", error)
    const err = error as ApiResponse<any>
    throw new Error(err?.message || "Failed to export parents")
  }
}
