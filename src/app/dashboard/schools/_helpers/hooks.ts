import qk from "@/lib/query-keys"
import { useQuery } from "@tanstack/react-query"
import { getAllSchools, getSchool, getSchoolsPaginated } from "./actions"

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

export function useSchool(id: number) {
  return useQuery({
    queryKey: qk.schools.single(id),
    queryFn: ({ queryKey }) => getSchool(queryKey[1] as number)
  })
}
