import { RideGroupTracker } from "./_components/ride-group-tracker"

type Props = {
  searchParams: TSearchParams
}

export default async function TrackRideGroupsPage({ searchParams }: Props) {
  const sp = await searchParams

  return <RideGroupTracker searchParams={sp} />
}
