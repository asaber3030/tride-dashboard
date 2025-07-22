const qk = {
  admins: {
    index: (sp: TObject = {}) => ["admins", sp]
  },
  roles: {
    index: () => ["roles"],
    rolePermission: (roleId: number) => ["roles", roleId, "permissions"]
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
  governorates: {
    index: (sp: TObject = {}) => ["governorates", sp],
    all: (sp: TObject = {}) => ["governorates", sp, "all"]
  },
  payments: {
    paginated: (sp: TObject = {}) => ["payments", "paginated", sp],
    single: (paymentId: number) => ["payments", paymentId]
  }
}

export default qk
