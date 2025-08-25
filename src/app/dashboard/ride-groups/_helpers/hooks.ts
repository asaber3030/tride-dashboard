import qk from "@/lib/query-keys"

import { useQuery } from "@tanstack/react-query"
import { getRideGroup, getRideGroupChat, getRideGroupLocations, getRideGroupsPaginated } from "./actions"

export function usePaginatedRideGroups(searchParams: TObject = {}) {
  return useQuery({
    queryKey: qk.rideGroups.paginated(searchParams),
    queryFn: ({ queryKey }) => getRideGroupsPaginated(queryKey[2] as TObject),
    retry: false
  })
}

export function useRideGroup(id: number) {
  return useQuery({
    queryKey: qk.rideGroups.single(id),
    queryFn: ({ queryKey }) => getRideGroup(queryKey[1] as number)
  })
}

export function useRideGroupChat(id: number) {
  return useQuery({
    queryKey: qk.rideGroups.single(id),
    queryFn: ({ queryKey }) => getRideGroupChat(queryKey[1] as number),
    retry: false
  })
}

export function useRideGroupLocations(id: number) {
  return useQuery({
    queryKey: qk.rideGroups.rideGroupLocations(id),
    queryFn: ({ queryKey }) => getRideGroupLocations(queryKey[1] as number)
  })
}
