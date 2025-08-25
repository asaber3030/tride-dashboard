type ApiResponse<T> = {
  data: T
  message: string
  status: number
}

type TLanguage = "ar" | "en"
type TObject = Record<any, any>
type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE"
type TPaymentStatus = "new" | "pending" | "paid" | "expired"

type Coordinates = { lat: number; lng: number }
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

type PaginationItems = {
  page: number
  nextPage: number | null
  lastPage: number | null
  itemCount: number
  totalPages: number
  totalItems: number
}

type TSettingsURL = "account" | "roles"
type TAccountType = "admin" | "parent" | "driver"
type TRoleType = "super admin" | "operations manager" | "support admin" | "basic admin"
type TSearchParams = Promise<TObject>
type TChatRoomType = "ride_group" | "private" | "customer_support"
type TChatMessageStatus = "sent" | "delivered" | "read"
type TChatMessageSender = "parent" | "driver" | "admin"
type TGroupType = "premium" | "regular"
type TRideGroupInstanceStatus = "active" | "started" | "ended"
type TRideGroupInstanceType = "to_home" | "to_school"

type SocketAck<T, P = string> = {
  type: P
  message: string
  data: T
}
