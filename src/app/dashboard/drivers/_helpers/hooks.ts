import qk from "@/lib/query-keys"
import { useQuery } from "@tanstack/react-query"
import { getDriver, getDriversPaginated } from "./actions"

export function usePaginatedDrivers(searchParams: TObject = {}) {
  return useQuery({
    queryKey: qk.drivers.paginated(searchParams),
    queryFn: ({ queryKey }) => getDriversPaginated(queryKey[2] as TObject),
    retry: false
  })
}

export function useDriver(id: number) {
  return useQuery({
    queryKey: qk.drivers.single(id),
    queryFn: ({ queryKey }) => getDriver(queryKey[1] as number)
  })
}
