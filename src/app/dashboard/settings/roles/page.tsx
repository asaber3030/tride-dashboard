import { notFound } from "next/navigation"
import { getUser } from "@/actions/auth"

import { AdminRolesTable } from "../_components/roles-table"

export default async function AdminRolesPage() {
  const user = await getUser()
  if (!user || user.role?.role_name != "super admin") return notFound()

  return <AdminRolesTable />
}
