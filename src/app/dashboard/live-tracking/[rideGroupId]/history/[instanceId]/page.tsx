import routes from "@/lib/routes"
import Link from "next/link"

import { getRideGroupInstanceHistory, getRideGroupInstances } from "@/app/dashboard/ride-groups/_helpers/actions"
import { SimplePagination } from "@/components/common/simple-pagination"
import { PageHeader } from "@/components/dashboard/page-header"
import { Pagination } from "@/components/dashboard/pagination"
import { getTranslations } from "next-intl/server"
import { notFound } from "next/navigation"
import { InstanceLocationsHistory } from "../../_components/instance-history-locations-map"
import { InstanceDetails } from "../../_components/instance-history-details"

type Props = {
  params: Promise<{
    rideGroupId: string
    instanceId: string
  }>
}

export default async function ViewInstanceLocationsHistory({ params }: Props) {
  const { rideGroupId, instanceId } = await params

  const t = await getTranslations()

  if (isNaN(+rideGroupId) || isNaN(+instanceId)) return notFound()

  const data = await getRideGroupInstanceHistory(+rideGroupId, +instanceId)

  return (
    <div className='space-y-4'>
      <PageHeader title={t("allAvailableInstancesForRideGroup")} description={t("viewAllInstancesForRideGroup")} />
      <InstanceDetails instance={data.instance} checkpointsLength={data.locations.length} />
      <InstanceLocationsHistory locations={data.locations} />
    </div>
  )
}
