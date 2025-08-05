import { getUser } from "@/actions/auth"
import { AdminsTable } from "./_component/table"
import { PageHeader } from "@/components/dashboard/page-header"
import { notFound } from "next/navigation"

type Props = {
  searchParams: TSearchParams
}

export default async function AdminsPage({ searchParams }: Props) {
  const sp = await searchParams
  const user = await getUser()

  if (!user || user.role?.role_name != "super admin") return notFound()

  return (
    <div className='p-6'>
      <PageHeader title='Admins' description='Manage available Admins and control actions & filter.' />
      <AdminsTable sp={sp} />
    </div>
  )
}
