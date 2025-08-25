import { getRideGroup, getRideGroupInstances } from "@/app/dashboard/ride-groups/_helpers/actions"
import { getTranslations } from "next-intl/server"
import { notFound } from "next/navigation"

import { RideDetailsForInstance } from "../_components/ride-details"
import { RideGroupInstancesList } from "../_components/instances-list"
import { PageHeader } from "@/components/dashboard/page-header"

type Props = {
  params: Promise<{
    rideGroupId: string
  }>
}

export default async function ViewRideGroupHistory({ params }: Props) {
  const { rideGroupId: id } = await params

  const t = await getTranslations()
  const groupId = +id

  if (isNaN(groupId)) return notFound()

  const instances = await getRideGroupInstances(groupId)
  const rideGroup = await getRideGroup(groupId)

  if (!rideGroup) return notFound()

  return (
    <div className='space-y-6'>
      <PageHeader title={t("allAvailableInstancesForRideGroup")} description={t("viewAllInstancesForRideGroup")} />
      <section>
        <h1 className='text-2xl font-semibold mb-2'>{t("allInstancesForRideGroup", { name: rideGroup.group_name })}</h1>
        <RideGroupInstancesList instances={instances.rows} hasNextPage={instances.hasNextPage} hasPrevPage={instances.hasPrevPage} />
      </section>

      <section>
        <h1 className='text-2xl font-semibold mb-2'>{t("rideGroupDetails", { name: rideGroup.group_name })}</h1>
        <RideDetailsForInstance rideGroup={rideGroup} />
      </section>
    </div>
  )
}
