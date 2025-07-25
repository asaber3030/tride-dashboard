import { useQuery } from "@tanstack/react-query"
import { getUserDetails } from "@/actions/app"

import qk from "@/lib/query-keys"

export function useUserDetails(id: number, type: string) {
  return useQuery({
    queryKey: qk.users.details(id, type),
    queryFn: ({ queryKey }) => getUserDetails(queryKey[1] as number, queryKey[2] as string)
  })
}
