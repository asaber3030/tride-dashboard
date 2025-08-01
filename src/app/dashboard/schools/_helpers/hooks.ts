import qk from "@/lib/query-keys"
import { useQuery } from "@tanstack/react-query"
import { getAllSchools, getSchoolsPaginated } from "./actions"

export function usePaginatedSchools(searchParams: TObject = {}) {
  return useQuery({
    queryKey: qk.schools.paginated(searchParams),
    queryFn: ({ queryKey }) => getSchoolsPaginated(queryKey[2] as TObject)
  })
}

export function useAllSchools(searchParams: TObject = {}) {
  return useQuery({
    queryKey: qk.schools.all(searchParams),
    queryFn: ({ queryKey }) => getAllSchools(queryKey[2] as TObject)
  })
}
