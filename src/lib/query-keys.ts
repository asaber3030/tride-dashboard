const qk = {
  admins: {
    index: (sp: TObject = {}) => ["admins", sp]
  },
  roles: {
    index: () => ["roles"],
    rolePermission: (roleId: number) => ["roles", roleId, "permissions"]
  },
  users: {
    details: (id: number, type: string) => ["users", id, type]
  },
  permissions: {
    index: () => ["permissions"]
  },
  schools: {
    index: (sp: TObject = {}) => ["schools", sp],
    paginated: (sp: TObject = {}) => ["schools", "paginated", sp],
    single: (schoolId: number) => ["schools", schoolId],
    citySchools: (cityId: number) => ["schools", "city", cityId]
  },
  cities: {
    index: (sp: TObject = {}) => ["cities", sp],
    paginated: (sp: TObject = {}) => ["cities", "paginated", sp]
  },
  drivers: {
    paginated: (sp: TObject = {}) => ["drivers", "paginated", sp],
    single: (driverId: number) => ["drivers", driverId]
  },
  governorates: {
    index: (sp: TObject = {}) => ["governorates", sp],
    all: (sp: TObject = {}) => ["governorates", sp, "all"]
  },
  payments: {
    paginated: (sp: TObject = {}) => ["payments", "paginated", sp],
    single: (paymentId: number) => ["payments", paymentId]
  },
  rideGroups: {
    paginated: (sp: TObject = {}) => ["ride-groups", "paginated", sp],
    single: (paymentId: number) => ["ride-groups", paymentId]
  },
  chats: {
    all: (sp: TObject = {}, type: TChatRoomType = "customer_support") => ["chats", "customer-support", "all", sp, type],
    singleChat: (chatId: string) => ["chats", "customer-support", chatId],
    chatMessages: (chatId: string, sp: TObject = {}, type: TChatRoomType = "customer_support") => ["chats", "customer-support", chatId, "messages", sp, type]
  }
}

export default qk
