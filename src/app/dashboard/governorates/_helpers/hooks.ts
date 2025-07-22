import qk from "@/lib/query-keys"
import { useQuery } from "@tanstack/react-query"
import { getGovernorates, getGovernoratesPaginated } from "./actions"

export function usePaginatedGovernorates(searchParams: TObject = {}) {
  return useQuery({
    queryKey: qk.governorates.index(searchParams),
    queryFn: ({ queryKey }) => getGovernoratesPaginated(queryKey[1] as TObject)
  })
}

export function useGovernorates(searchParams: TObject = {}) {
  return useQuery({
    queryKey: qk.governorates.all(searchParams),
    queryFn: ({ queryKey }) => getGovernorates(queryKey[1] as TObject)
  })
}
