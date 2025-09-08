import { PageHeader } from "@/components/dashboard/page-header"
import { RideGroupsTable } from "./_components/table"
import { getTranslations } from "next-intl/server"
import { notFound } from "next/navigation"
import { hasAccessTo } from "@/actions/roles"
import { LinkBtn } from "@/components/common/link-button"
import routes from "@/lib/routes"
import { Separator } from "@/components/ui/separator"
import { CombineIcon, MapIcon } from "lucide-react"

type Props = {
  searchParams: TSearchParams
}

export default async function RideGroupsPage({ searchParams }: Props) {
  const t = await getTranslations()
  const sp = await searchParams

  const hasAccess = await hasAccessTo("Trips")
  if (!hasAccess) return notFound()

  return (
    <div>
      <PageHeader title={t("rideGroups")} description={t("rideGroupsDescription")} />
      <div className='overflow-x-auto'>
        <RideGroupsTable sp={sp} />
      </div>
      <Separator className='my-4' />
      <div className='grid grid-cols-2 gap-2'>
        <LinkBtn linkClassName='w-full' className='w-full' icon={MapIcon} href={routes.rideGroups.tracker}>
          {t("rideGroupsTracker")}
        </LinkBtn>
        <LinkBtn linkClassName='w-full' className='w-full' icon={CombineIcon} href={routes.rideGroups.merge} variant='outline'>
          {t("rideGroupsMerge")}
        </LinkBtn>
      </div>
    </div>
  )
}
