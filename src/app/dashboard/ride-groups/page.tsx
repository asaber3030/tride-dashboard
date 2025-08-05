import { PageHeader } from "@/components/dashboard/page-header"
import { RideGroupsTable } from "./_components/table"
import { getTranslations } from "next-intl/server"
import { notFound } from "next/navigation"
import { hasAccessTo } from "@/actions/roles"

type Props = {
  searchParams: TSearchParams
}

export default async function RideGroupsPage({ searchParams }: Props) {
  const t = await getTranslations()
  const sp = await searchParams

  const hasAccess = await hasAccessTo("Trips")
  if (!hasAccess) return notFound()

  return (
    <div className='p-6'>
      <PageHeader title={t("rideGroups")} description={t("rideGroupsDescription")} />
      <div className='overflow-x-auto'>
        <RideGroupsTable sp={sp} />
      </div>
    </div>
  )
}
