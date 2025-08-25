import qk from "@/lib/query-keys"

import { useQuery } from "@tanstack/react-query"
import { getParentGroupSubscription, getParentGroups, getRideGroup, getRideGroupChat, getRideGroupLocations, getRideGroupsPaginated } from "./actions"

export function usePaginatedRideGroups(searchParams: TObject = {}) {
  return useQuery({
    queryKey: qk.rideGroups.paginated(searchParams),
    queryFn: ({ queryKey }) => getRideGroupsPaginated(queryKey[2] as TObject),
    retry: false
  })
}

export function useParentGroupsOfGroup(groupId: number) {
  return useQuery({
    queryKey: qk.rideGroups.singleParentGroups(groupId),
    queryFn: ({ queryKey }) => getParentGroups(queryKey[1] as number),
    retry: false
  })
}

export function useGroupSubscriptionOfParent(groupId: number, parentId: number) {
  return useQuery({
    queryKey: qk.rideGroups.singleParentGroupSubscription(groupId, parentId),
    queryFn: ({ queryKey }) => getParentGroupSubscription(queryKey[1] as number, queryKey[3] as number),
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
