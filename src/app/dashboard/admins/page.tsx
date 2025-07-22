import { AdminsTable } from "./_component/table"
import { PageHeader } from "@/components/dashboard/page-header"

type Props = {
  searchParams: TSearchParams
}

export default async function AdminsPage({ searchParams }: Props) {
  const sp = await searchParams

  return (
    <div>
      <PageHeader title='Admins' description='Manage available Admins and control actions & filter.' />
      <AdminsTable sp={sp} />
    </div>
  )
}
