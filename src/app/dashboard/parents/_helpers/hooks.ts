import qk from "@/lib/query-keys"

import { useQuery } from "@tanstack/react-query"
import { getParent, getParentRideGroups, getParentsPaginated } from "./actions"

export function usePaginatedParents(searchParams: TObject = {}) {
  return useQuery({
    queryKey: qk.parents.paginated(searchParams),
    queryFn: ({ queryKey }) => getParentsPaginated(queryKey[2] as TObject)
  })
}

export function useParent(id: number) {
  return useQuery({
    queryKey: qk.parents.single(id),
    queryFn: ({ queryKey }) => getParent(queryKey[1] as number)
  })
}

export function useParentRideGroups(id: number) {
  return useQuery({
    queryKey: qk.parents.rideGroups(id),
    queryFn: ({ queryKey }) => getParentRideGroups(queryKey[1] as number)
  })
}
