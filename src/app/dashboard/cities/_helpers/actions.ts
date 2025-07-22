"use server"

import { build } from "search-params"
import { api } from "@/services/axios"

import { CitySchema } from "@/schema/models"
import { City } from "@/types/models"
import { z } from "zod"

type GetCities = PaginatedData<City>

export async function getCitiesPaginated(searchParams: TObject = {}) {
  try {
    const sp = build(searchParams)
    const url = `/cities/paginated?${sp}`
    const req = await api<GetCities>("GET", url)
    return req.data
  } catch (error) {
    const err = error as ApiResponse<any>
    throw new Error(err?.data?.data?.message || "Failed to fetch cities")
  }
}

export async function getCities(searchParams: TObject = {}) {
  try {
    const sp = build(searchParams)
    const url = `/cities?${sp}`
    const req = await api<{ data: City[] }>("GET", url)
    return req.data.data
  } catch (error) {
    const err = error as ApiResponse<any>
    throw new Error(err?.data?.data?.message || "Failed to fetch cities")
  }
}

export async function createCityAction(data: z.infer<typeof CitySchema>) {
  try {
    const url = `/cities`
    const req = await api<City>("POST", url, data)
    return req
  } catch (error) {
    const err = error as ApiResponse<any>
    throw new Error(err?.data?.data?.message || "Failed to create city")
  }
}

export async function updateCityAction(id: number, data: z.infer<typeof CitySchema>) {
  try {
    const url = `/cities/${id}`
    const req = await api<City>("PUT", url, data)
    return req
  } catch (error) {
    const err = error as ApiResponse<any>
    throw new Error(err?.data?.data?.message || "Failed to update city")
  }
}

export async function deleteCityAction(id: number) {
  try {
    const url = `/city/${id}`
    const req = await api<City>("DELETE", url)
    return req
  } catch (error) {
    const err = error as ApiResponse<any>
    throw new Error(err?.data?.data?.message || "Failed to delete city")
  }
}
