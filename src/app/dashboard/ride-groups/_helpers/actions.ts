"use server"

import { build } from "search-params"
import { api } from "@/services/axios"

import { FullRideGroup, Payment } from "@/types/models"

type GetRideGroups = {
  pagination: {
    page: number
    nextPage: number | null
    lastPage: number | null
    itemCount: number
    totalPages: number
    totalItems: number
  }
  rideGroups: FullRideGroup[]
}

export async function getRideGroupsPaginated(searchParams: TObject = {}) {
  try {
    const sp = build(searchParams)
    const url = `/manage/ride/groups?${sp}`
    const req = await api<GetRideGroups>("GET", url)
    return req.data
  } catch (error) {
    const err = error as ApiResponse<any>
    throw new Error(err?.data?.data?.message || "Failed to fetch ride groups")
  }
}

export async function getRideGroup(id: number) {
  try {
    const url = `/manage/ride/groups/${id}`
    const req = await api<{ rideGroup: FullRideGroup }>("GET", url)
    return req.data.rideGroup
  } catch (error) {
    const err = error as ApiResponse<any>
    throw new Error(err?.data?.data?.message || "Failed to fetch group")
  }
}

export async function mergeRideGroupAction(groupId: number, destinationId: number) {
  try {
    const url = `/manage/ride/group/merge`
    const req = await api("PUT", url, {
      group_src: groupId,
      group_dest: destinationId
    })
    return req
  } catch (error) {
    const err = error as ApiResponse<any>
    throw new Error(err?.data?.data?.message || "Failed to merge groups")
  }
}
