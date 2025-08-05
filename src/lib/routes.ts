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
  createSchool: "/dashboard/schools/create",
  updateSchool: (id: number): string => `/dashboard/schools/${id}`,
  drivers: "/dashboard/drivers",
  viewDriver: (id: number) => `/dashboard/drivers/${id}`,
  rideGroups: {
    index: "/dashboard/ride-groups",
    tracker: "/dashboard/ride-groups/tracker",
    view: (id: number): string => `/dashboard/ride-groups/${id}`
  },
  payments: (path?: string): string => (path ? `/dashboard/payments/${path}` : "/dashboard/payments"),
  viewPayment: (id: number): string => `/dashboard/payments/${id}`,
  settings: (path: TSettingsURL): string => `/dashboard/settings/${path}`,
  chats: {
    all: `/dashboard/chats/customer_support`,
    viewChatsOfType: (type: TChatRoomType = "customer_support"): string => `/dashboard/chats/${type}`,
    chatMessages: (id: string, type: TChatRoomType = "customer_support"): string => `/dashboard/chats/${type}/${id}`
  },
  parents: {
    index: "/dashboard/parents",
    view: (id: number): string => `/dashboard/parents/${id}`
  }
}

export default routes
