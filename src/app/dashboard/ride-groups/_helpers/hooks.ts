import qk from "@/lib/query-keys"

import { useQuery } from "@tanstack/react-query"
import { getRideGroup, getRideGroupsPaginated } from "./actions"

export function usePaginatedRideGroups(searchParams: TObject = {}) {
  return useQuery({
    queryKey: qk.rideGroups.paginated(searchParams),
    queryFn: ({ queryKey }) => getRideGroupsPaginated(queryKey[2] as TObject)
  })
}

export function useRideGroup(id: number) {
  return useQuery({
    queryKey: qk.rideGroups.single(id),
    queryFn: ({ queryKey }) => getRideGroup(queryKey[1] as number)
  })
}
