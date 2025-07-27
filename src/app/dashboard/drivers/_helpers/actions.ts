"use server"

import { build } from "search-params"
import { api } from "@/services/axios"

import { Driver, DriverPapers } from "@/types/models"

type GetDrivers = {
  pagination: {
    page: number
    nextPage: number | null
    lastPage: number | null
    itemCount: number
    totalPages: number
    totalItems: number
  }
  drivers: Driver[]
}

export async function getDriversPaginated(searchParams: TObject = {}): Promise<GetDrivers> {
  try {
    const sp = build(searchParams)
    const url = `/drivers?${sp}`
    const req = await api<GetDrivers>("GET", url)
    return req.data
  } catch (error) {
    const err = error as ApiResponse<any>
    throw new Error(err?.data?.data?.message || "Failed to fetch drivers")
  }
}

export async function getDriver(id: number) {
  try {
    const url = `/drivers/${id}`
    const req = await api<{ driver: Driver }>("GET", url)
    return req.data.driver
  } catch (error) {
    const err = error as ApiResponse<any>
    throw new Error(err?.data?.data?.message || "Failed to fetch driver")
  }
}

export async function updateDriverPapersStatusAction(driverId: number, status: boolean) {
  try {
    const url = `/drivers/${driverId}/papers`
    const req = await api<DriverPapers>("PATCH", url, {
      approved: status
    })
    return req
  } catch (error) {
    const err = error as ApiResponse<any>
    throw new Error(err?.data?.message || "Failed to update driver")
  }
}
