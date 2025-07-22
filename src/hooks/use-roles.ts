import qk from "@/lib/query-keys"
import { getRolePermissions, getRoles } from "@/actions/roles"
import { useQuery } from "@tanstack/react-query"

export function useRoles() {
  return useQuery({
    queryKey: qk.roles.index(),
    queryFn: getRoles
  })
}

export function useRolePermissions(roleId: number) {
  return useQuery({
    queryKey: qk.roles.rolePermission(roleId),
    queryFn: ({ queryKey }) => getRolePermissions(queryKey[1] as number)
  })
}
