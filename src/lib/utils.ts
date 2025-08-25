import moment from "moment"

import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { toast } from "react-toastify"

import { LanguagesList } from "./lists"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function showResponse<T>(data: ApiResponse<T>, execute?: () => void) {
  if (data?.status >= 200 && data?.status <= 299) {
    toast.success(data?.message)
    if (execute) execute()
    return
  }
  toast.error(data?.message)
  if (execute) execute()
  return
}

export function handleError(error: any) {
  toast.error(error?.message || "ERROR - Something went wrong")
}

export function diffForHumans(date: Date) {
  return moment(date).fromNow()
}

export function formatDate(date: Date, format: string = "YYYY-MM-DD") {
  return moment(date).format(format)
}

export function formatToEGP(amount: string): string {
  return new Intl.NumberFormat("en-EG", {
    style: "currency",
    currency: "EGP",
    minimumFractionDigits: 2
  }).format(+amount)
}

export function capitalize(str: string): string {
  return str.replace(/_/g, " ").replace(/\b\w/g, (char) => char.toUpperCase())
}

export function checkLanguage(locale: string): TLanguage {
  return (LanguagesList.includes(locale) ? locale : "en") as TLanguage
}

export function extractInfoFromDate(txt: string) {
  const arr = txt.split("-")
  return {
    day: arr[2],
    year: arr[0],
    month: arr[1]
  }
}

export function objectToFormData(obj: Record<string, any>): FormData {
  const formData = new FormData()

  function appendFormData(data: any, rootKey?: string) {
    if (data instanceof File) {
      if (rootKey) formData.append(rootKey, data)
    } else if (Array.isArray(data)) {
      data.forEach((item, idx) => {
        const key = rootKey ? `${rootKey}[${idx}]` : `${idx}`
        appendFormData(item, key)
      })
    } else if (typeof data === "object" && data !== null) {
      Object.keys(data).forEach((key) => {
        const value = data[key]
        const formKey = rootKey ? `${rootKey}[${key}]` : key
        appendFormData(value, formKey)
      })
    } else if (data !== undefined && data !== null) {
      if (rootKey) formData.append(rootKey, data)
    }
  }

  appendFormData(obj)

  return formData
}

const statusColors: Record<TParentGroupStatus, string> = {
  new: "bg-blue-500 text-white",
  pending: "bg-yellow-500 text-black",
  expired: "bg-gray-500 text-white",
  ready: "bg-green-500 text-white",
  active: "bg-emerald-600 text-white",
  inactive: "bg-red-400 text-white",
  removed: "bg-red-600 text-white"
}

interface StatusBadgeProps {
  status: TParentGroupStatus
}

export function parentGroupStatusColor(status: TParentGroupStatus) {
  return statusColors[status]
}
