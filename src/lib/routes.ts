const routes = {
  home: "/dashboard",
  dashboard: "/dashboard",
  login: "/login",
  register: "/register",
  forgotPassword: "/forgot-password",
  verifyEmail: "/verify-email",
  trips: "/dashboard/trips",
  requests: "/dashboard/requests",
  tracking: "/dashboard/live-tracking",
  schools: "/dashboard/schools",
  drivers: "/dashboard/drivers",
  viewDriver: (id: number) => `/dashboard/drivers/${id}`,
  rideGroups: {
    index: "/dashboard/ride-groups",
    view: (id: number): string => `/dashboard/ride-groups/${id}`
  },
  payments: (path?: string): string => (path ? `/dashboard/payments/${path}` : "/dashboard/payments"),
  viewPayment: (id: number): string => `/dashboard/payments/${id}`,
  settings: (path: TSettingsURL): string => `/dashboard/settings/${path}`,
  chats: {
    all: `/dashboard/chats/customer_support`,
    viewChatsOfType: (type: TChatRoomType = "customer_support"): string => `/dashboard/chats/${type}`,
    chatMessages: (id: string, type: TChatRoomType = "customer_support"): string => `/dashboard/chats/${type}/${id}`
  }
}

export default routes
