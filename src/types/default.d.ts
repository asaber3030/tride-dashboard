type ApiResponse<T> = {
  data: T
  message: string
  status: number
}

type TLanguage = "ar" | "en"
type TObject = Record<any, any>
type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE"
type TPaymentStatus = "new" | "pending" | "paid" | "expired"

type Timestamps = {
  created_at: Date
  updated_at: Date
}

type PaginatedData<T> = {
  rows: T[]
  count: number
  hasNextPage: boolean
  hasPrevPage: boolean
}

type TSettingsURL = "account" | "roles"
type TAccountType = "admin" | "parent" | "driver"
type TSearchParams = Promise<TObject>
