"use server"

import { build } from "search-params"
import { api } from "@/services/axios"

import { CreateParentSubscriptionSchema, SchoolSchema } from "@/schema/models"
import { Payment, School } from "@/types/models"
import { z } from "zod"
import { formatDate } from "@/lib/utils"
import { getToken } from "@/actions/auth"
import { API_URL } from "@/lib/constants"

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
    const req = await api<{ payment: Payment }>("GET", url)
    return req.data.payment
  } catch (error) {
    const err = error as ApiResponse<any>
    console.error("Error fetching payment:", error)
    throw new Error(err?.data?.data?.message || "Failed to fetch payment")
  }
}

export async function exportPaymentsToExcel(startDate: Date, endDate: Date) {
  try {
    const dates = {
      from: formatDate(startDate, "yyyy-MM-d"),
      to: formatDate(endDate, "yyyy-MM-d")
    }
    const url = `${API_URL}/payments/export/all?${build(dates)}`
    const req = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${(await getToken()) || ""}`
      }
    })
    const data = await req.blob()
    return data
  } catch (error) {
    console.error("Error exporting payments:", error)
    const err = error as ApiResponse<any>
    throw new Error(err?.data?.data?.message || "Failed to export payments")
  }
}

export async function createParentCashAction(data: z.infer<typeof CreateParentSubscriptionSchema>) {
  try {
    const req = await api<any>("POST", `/payments/parents/create-cash`, data)
    console.log(req)
    return req
  } catch (error) {
    const err = error as ApiResponse<any>
    return err
  }
}
