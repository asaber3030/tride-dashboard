import { notFound } from "next/navigation"
import { getRideGroup } from "../../ride-groups/_helpers/actions"
import { SingleRideGroupTrackingDetails } from "../_components/single/details"
import { SingleRideGroupTrackingMap } from "../_components/single/map"
import { SocketProvider } from "@/providers/ws.provider"

type Props = {
  params: Promise<{ rideGroupId: string }>
  searchParams: TSearchParams
}

export default async function SingleRideGroupTracker({ params, searchParams }: Props) {
  const { rideGroupId: id } = await params

  const rideGroupId = +id
  const sp = await searchParams

  const rideGroup = await getRideGroup(rideGroupId)

  if (!rideGroup) return notFound()

  return (
    <SocketProvider>
      <div className='flex h-screen bg-gray-50'>
        <SingleRideGroupTrackingDetails group={rideGroup} />
        <SingleRideGroupTrackingMap rideId={id} group={rideGroup} />
      </div>
    </SocketProvider>
  )
}
