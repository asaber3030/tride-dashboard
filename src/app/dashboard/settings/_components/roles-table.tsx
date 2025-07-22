"use client"

import qk from "@/lib/query-keys"

import { capitalize, handleError, showResponse } from "@/lib/utils"
import { updateRolePermissionsAction } from "@/actions/roles"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useEffect, useState } from "react"
import { useTranslations } from "next-intl"
import { usePermissions } from "@/hooks/use-permissions"
import { useRoles } from "@/hooks/use-roles"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { TableSkeleton } from "@/components/common/skeletons/table"
import { LoadingButton } from "@/components/common/loading-button"
import { DisplayError } from "@/components/common/error"
import { Checkbox } from "@/components/ui/checkbox"
import { SaveIcon } from "lucide-react"

type CheckedPermissionsState = Record<number, Set<number>>
type Mutation = {
  roleId: number
  permissions: number[]
}

export function AdminRolesTable() {
  const t = useTranslations()
  const qc = useQueryClient()

  const { data: roles, isLoading: isRolesLoading, isError: isRolesHasError, error: rolesError } = useRoles()
  const { data: permissions, isLoading: isPermissionsLoading, isError: isPermissionsHasError, error: permissionsError } = usePermissions()

  const [checkedPermissions, setCheckedPermissions] = useState<CheckedPermissionsState>({})

  const handleCheckboxChange = (roleId: number, permissionId: number, checked: boolean) => {
    setCheckedPermissions((prev) => {
      const current = new Set(prev[roleId] || [])
      if (checked) {
        current.add(permissionId)
      } else {
        current.delete(permissionId)
      }
      return {
        ...prev,
        [roleId]: current
      }
    })
  }

  const updateRolePermissionsMutation = useMutation({
    mutationFn: ({ roleId, permissions }: Mutation) => updateRolePermissionsAction(roleId, permissions),
    onSuccess: (data) =>
      showResponse(data, () => {
        qc.invalidateQueries({ queryKey: qk.roles.index() })
        qc.invalidateQueries({ queryKey: qk.permissions.index() })
      }),
    onError: (error) => handleError(error)
  })

  const handleUpdate = (roleId: number) => {
    const permissions = Array.from(checkedPermissions[roleId] || [])
    updateRolePermissionsMutation.mutate({ roleId, permissions })
  }

  useEffect(() => {
    if (roles && permissions) {
      const initial: CheckedPermissionsState = {}
      for (const role of roles) {
        initial[role.id] = new Set(role.permissions.map((perm) => perm.id))
      }
      setCheckedPermissions(initial)
    }
  }, [roles, permissions])

  if (isRolesLoading || isPermissionsLoading) return <TableSkeleton rows={4} columns={8} />
  if (isRolesHasError) return <DisplayError error={rolesError} />
  if (isPermissionsHasError) return <DisplayError error={permissionsError} />

  return (
    <div className='space-y-4'>
      <div className='rounded-md border'>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className='w-[150px]'>{t("rolesLabel")}</TableHead>
              {permissions?.map((permission) => (
                <TableHead key={permission.id} className='text-center'>
                  {permission.role_permission_name}
                </TableHead>
              ))}
              <TableHead className='w-[150px]'>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {roles?.map((role) => (
              <TableRow key={role.role_name}>
                <TableCell className='font-medium'>{capitalize(role.role_name)}</TableCell>
                {permissions?.map((permission) => (
                  <TableCell key={permission.id} className='text-center'>
                    <Checkbox checked={checkedPermissions[role.id]?.has(permission.id) ?? false} onCheckedChange={(checked) => handleCheckboxChange(role.id, permission.id, !!checked)} className='mx-auto' />
                  </TableCell>
                ))}
                <TableCell>
                  <LoadingButton size='icon' icon={SaveIcon} variant='outline' onClick={() => handleUpdate(role.id)} loading={updateRolePermissionsMutation.isPending} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
