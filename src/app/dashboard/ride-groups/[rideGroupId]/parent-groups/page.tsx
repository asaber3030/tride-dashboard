import { PageHeader } from "@/components/dashboard/page-header"

import { getTranslations } from "next-intl/server"
import { notFound } from "next/navigation"
import { hasAccessTo } from "@/actions/roles"
import { LinkBtn } from "@/components/common/link-button"
import routes from "@/lib/routes"
import { Separator } from "@/components/ui/separator"
import { CombineIcon, MapIcon } from "lucide-react"
import { ParentGroupsTable } from "../../_components/parent-groups/table"

type Props = {
  searchParams: TSearchParams
  params: Promise<{
    rideGroupId: string
  }>
}

export default async function ParentGroups({ searchParams, params }: Props) {
  const t = await getTranslations()
  const sp = await searchParams

  const { rideGroupId } = await params

  const hasAccess = await hasAccessTo("Trips")
  if (!hasAccess) return notFound()
  if (isNaN(Number(rideGroupId))) return notFound()

  return (
    <div>
      <PageHeader title={t("parentGroupsOfRideGroupId", { id: rideGroupId })} description={t("rideGroupsDescription")} />
      <div className='overflow-x-auto'>
        <ParentGroupsTable rideGroupId={+rideGroupId} sp={sp} />
      </div>
    </div>
  )
}
