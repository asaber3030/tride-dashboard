"use server"

import { build } from "search-params"
import { api } from "@/services/axios"

import { SchoolSchema } from "@/schema/models"
import { Payment, School } from "@/types/models"
import { z } from "zod"

type GetPayments = {
  pagination: {
    page: number
    nextPage: number | null
    lastPage: number | null
    itemCount: number
    totalPages: number
    totalItems: number
  }
  payments: Payment[]
}

export async function getPaymentsPaginated(searchParams: TObject = {}) {
  try {
    const sp = build(searchParams)
    const url = `/payments?${sp}`
    const req = await api<GetPayments>("GET", url)
    return req.data
  } catch (error) {
    const err = error as ApiResponse<any>
    throw new Error(err?.data?.data?.message || "Failed to fetch payments")
  }
}

export async function getPayment(id: number) {
  try {
    const url = `/payments/${id}`
    const req = await api<Payment>("GET", url)
    return req.data
  } catch (error) {
    const err = error as ApiResponse<any>
    throw new Error(err?.data?.data?.message || "Failed to fetch payment")
  }
}
