"use server"

import { build } from "search-params"
import { api } from "@/services/axios"

import { ChatRoom, FullRideGroup, InstanceLocation, ParentGroup, ParentGroupSubscription, Payment, RideGroup, RideGroupInstance, RideGroupLocation } from "@/types/models"

export async function getRideGroupsPaginated(searchParams: TObject = {}) {
  try {
    const sp = build(searchParams)
    const url = `/manage/ride/groups?${sp}`
    const req = await api<PaginatedData<FullRideGroup>>("GET", url)
    return req.data
  } catch (error) {
    console.error("Error fetching ride groups:", error)
    const err = error as ApiResponse<any>
    throw new Error(err?.data?.data?.message || "Failed to fetch ride groups")
  }
}

export async function getParentGroups(id: number, searchParams: TObject = {}) {
  try {
    const sp = build(searchParams)
    const url = `/manage/ride/groups/${id}/parent-groups`
    const req = await api<{ data: ParentGroup[] }>("GET", url)
    console.dir(req.data, { depth: null })
    return req.data
  } catch (error) {
    console.error("Error fetching ride groups:", error)
    const err = error as ApiResponse<any>
    throw new Error(err?.data?.data?.message || "Failed to fetch ride groups")
  }
}

export async function getParentGroupSubscription(groupId: number, parentId: number) {
  try {
    const url = `/manage/ride/groups/${groupId}/parent-groups/${parentId}/subscription`
    const req = await api<ParentGroupSubscription>("GET", url)
    console.log(req.data)
    return req.data
  } catch (error) {
    console.error("Error fetching ride groups:", error)
    const err = error as ApiResponse<any>
    throw new Error(err?.data?.data?.message || "Failed to fetch ride groups")
  }
}

export async function updateParentGroupStatus(groupId: number, parentId: number, status: TParentGroupStatus) {
  try {
    const url = `/manage/ride/groups/${groupId}/parent-groups/${parentId}`
    const req = await api<any>("PATCH", url, { status })
    console.dir(req.data, { depth: null })
    return req
  } catch (error) {
    return error as ApiResponse<any>
  }
}

export async function updateParentGroupSubscriptionStatus(groupId: number, parentId: number, status: TParentGroupSubscriptionStatus) {
  try {
    const url = `/manage/ride/groups/${groupId}/parent-groups/${parentId}/subscription`
    const req = await api<any>("PATCH", url, { status })
    return req.data
  } catch (error) {
    return error as ApiResponse<any>
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

export async function getRideGroupChat(id: number) {
  try {
    const url = `/manage/ride/groups/${id}/chat`
    const req = await api<ChatRoom>("GET", url)
    return req.data
  } catch (error) {
    console.error("Error fetching ride group chat:", error)
    const err = error as ApiResponse<any>
    throw new Error(err?.data?.message || "Failed to get group chat")
  }
}

export async function getRideGroupLocations(id: number) {
  try {
    const url = `/manage/ride/groups/${id}/locations`
    const req = await api<{ locations: RideGroupLocation[] }>("GET", url)
    return req.data.locations
  } catch (error) {
    const err = error as ApiResponse<any>
    throw new Error(err?.data?.data?.message || "Failed to fetch group")
  }
}

export async function getRideGroupInstances(id: number) {
  try {
    const url = `/manage/ride/groups/${id}/instances`
    const req = await api<PaginatedData<RideGroupInstance>>("GET", url)
    return req.data
  } catch (error) {
    console.error("Error fetching ride group instances:", error)
    const err = error as ApiResponse<any>
    throw new Error(err?.data?.data?.message || "Failed to fetch group")
  }
}

export async function getRideGroupInstanceHistory(id: number, instanceId: number) {
  try {
    const url = `/manage/ride/groups/${id}/instances/${instanceId}`
    const req = await api<{ instance: RideGroupInstance; locations: InstanceLocation[] }>("GET", url)
    return req.data
  } catch (error) {
    console.error("Error fetching ride group instance history:", error)
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
    return error as ApiResponse<any>
  }
}

export async function assignDriverToRideGroupAction(groupId: number, driverId: number) {
  try {
    const req = await api("PATCH", `/manage/ride/groups/${groupId}/assign-driver`, {
      driverId
    })
    return req
  } catch (error) {
    return error as ApiResponse<any>
  }
}

export async function mergeManyRideGroups(ids: number[], destinationId: number) {
  try {
    const req = await api("PUT", `/manage/ride/group/merge/many`, {
      group_src_list: ids,
      group_dest: destinationId
    })
    return req
  } catch (error) {
    return error as ApiResponse<any>
  }
}

export async function createRideGroupChatAction(id: number) {
  try {
    const url = `/manage/ride/groups/${id}/chat`
    const req = await api<ChatRoom>("POST", url)
    return req
  } catch (error) {
    const err = error as ApiResponse<any>
    return err
  }
}
