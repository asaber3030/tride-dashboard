import { PageHeader } from "@/components/dashboard/page-header"
import { getTranslations } from "next-intl/server"
import { unauthorized } from "next/navigation"
import { hasAccessTo } from "@/actions/roles"
import { RideGroupDetails } from "../_components/ride-group-details"

type Props = {
  searchParams: TSearchParams
  params: Promise<{
    rideGroupId: string
  }>
}

export default async function RideGroupsPage({ params, searchParams }: Props) {
  const t = await getTranslations()
  const sp = await searchParams
  const { rideGroupId } = await params

  const hasAccess = await hasAccessTo("Trips")
  if (!hasAccess) return unauthorized()

  return (
    <div className='p-6'>
      <PageHeader title={t("rideGroups")} description={t("rideGroupsDescription")} />
      <RideGroupDetails rideGroupId={+rideGroupId} />
    </div>
  )
}
