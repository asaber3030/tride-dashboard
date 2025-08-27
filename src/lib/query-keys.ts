const qk = {
  currentUser: () => ["currentUser"],
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
  plans: {
    index: () => ["plans"]
  },
  permissions: {
    index: () => ["permissions"]
  },
  schools: {
    index: (sp: TObject = {}) => ["schools", sp],
    paginated: (sp: TObject = {}) => ["schools", "paginated", sp],
    all: (sp: TObject = {}) => ["schools", "all", sp],
    single: (schoolId: number) => ["schools", schoolId],
    citySchools: (cityId: number) => ["schools", "city", cityId]
  },
  cities: {
    index: (sp: TObject = {}) => ["cities", sp],
    paginated: (sp: TObject = {}) => ["cities", "paginated", sp]
  },
  drivers: {
    paginated: (sp: TObject = {}) => ["drivers", "paginated", sp],
    single: (driverId: number) => ["drivers", driverId],
    singlePayments: (driverId: number, searchParams: TObject = {}) => ["drivers", driverId, "payments", searchParams]
  },
  parents: {
    paginated: (sp: TObject = {}) => ["parents", "paginated", sp],
    single: (driverId: number) => ["parents", driverId],
    rideGroups: (driverId: number) => ["parents", driverId, "ride-groups"]
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
    single: (id: number) => ["ride-groups", id],
    singleParentGroups: (id: number) => ["ride-groups", id, "parent-groups"],
    singleParentGroupSubscription: (groupId: number, parentId: number) => ["ride-groups", groupId, "parent-groups", parentId],
    singleChat: (id: number) => ["ride-groups", id, "chat"],
    rideGroupLocations: (id: number) => ["ride-groups", id, "locations"]
  },
  chats: {
    all: (sp: TObject = {}, type: TChatRoomType = "customer_support") => ["chats", "customer-support", "all", sp, type],
    singleChat: (chatId: string) => ["chats", "customer-support", chatId],
    chatMessages: (chatId: string, sp: TObject = {}, type: TChatRoomType = "customer_support") => ["chats", "customer-support", chatId, "messages", sp, type]
  }
}

export default qk
