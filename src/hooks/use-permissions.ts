import qk from "@/lib/query-keys"

import { getPermissions } from "@/actions/roles"
import { useQuery } from "@tanstack/react-query"

export function usePermissions() {
  return useQuery({
    queryKey: qk.permissions.index(),
    queryFn: getPermissions
  })
}
