import qk from "@/lib/query-keys"
import { useQuery } from "@tanstack/react-query"
import { getAdmins } from "./actions"

export function useAdmins(searchParams: TObject = {}) {
  return useQuery({
    queryKey: qk.admins.index(searchParams),
    queryFn: ({ queryKey }) => getAdmins(queryKey[1] as TObject)
  })
}
