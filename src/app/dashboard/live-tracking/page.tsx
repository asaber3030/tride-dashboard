import { getRideGroupsPaginated } from "../ride-groups/_helpers/actions"
import { hasAccessTo } from "@/actions/roles"
import { notFound } from "next/navigation"

import { LiveTrackingRideGroupsList } from "./_components/all/list-ride-groups"
import { SocketProvider } from "@/providers/ws.provider"
import { FiltersSidebar } from "./_components/all/filters"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Live Tracking",
  description: "Live tracking of vehicles and assets"
}

type Props = {
  searchParams: TSearchParams
}

export default async function Page({ searchParams }: Props) {
  const sp = await searchParams

  const hasAccess = await hasAccessTo("Live Tracking")
  if (!hasAccess) return notFound()

  const rideGroups = await getRideGroupsPaginated(sp)

  return (
    <div className='flex h-screen bg-gray-50 gap-4'>
      <FiltersSidebar rideGroupsLength={rideGroups.rideGroups.length} sp={sp} />
      <LiveTrackingRideGroupsList rideGroups={rideGroups.rideGroups} sp={sp} />
    </div>
  )
}
