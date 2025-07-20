type ApiResponse<T> = {
  data: T
  message: string
  status: number
}

type TLanguage = "ar" | "en"
type TObject = Record<string, string | string[] | undefined>
type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE"

type Timestamps = {
  created_at: Date
  updated_at: Date
}

type PaginatedData<T> = {
  page: number
  nextPage: number | null
  lastPage: number | null
  itemCount: number
  totalPages: number
  totalItems: number
  data: T[]
}

type TSettingsURL = "account" | "roles"
type TAccountType = "admin" | "parent" | "driver"
