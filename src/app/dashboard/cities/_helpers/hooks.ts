import qk from "@/lib/query-keys"
import { useQuery } from "@tanstack/react-query"
import { getCities, getCitiesPaginated } from "./actions"

export function usePaginatedCities(searchParams: TObject = {}) {
  return useQuery({
    queryKey: qk.cities.paginated(searchParams),
    queryFn: ({ queryKey }) => getCitiesPaginated(queryKey[2] as TObject)
  })
}

export function useCities(searchParams: TObject = {}) {
  return useQuery({
    queryKey: qk.cities.index(searchParams),
    queryFn: ({ queryKey }) => getCities(queryKey[1] as TObject)
  })
}
