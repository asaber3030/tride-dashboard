"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useTranslations } from "next-intl"

type Role = {
  name: string
  permissions: Record<string, boolean>
}

type Permission = {
  id: string
  name: string
}

export function AdminRolesTable() {
  const t = useTranslations()
  const permissions: Permission[] = [
    { id: "roles", name: t("permissionRoles") },
    { id: "chats", name: t("permissionChats") },
    { id: "trips", name: t("permissionTrips") },
    { id: "requests", name: t("permissionRequests") },
    { id: "liveTracking", name: t("permissionLiveTracking") },
    { id: "payments", name: t("permissionPayments") },
    { id: "schools", name: t("permissionSchools") },
    { id: "selectAll", name: t("permissionSelectAll") }
  ]

  const [roles, setRoles] = useState<Role[]>([
    {
      name: t("roleSuperAdmin"),
      permissions: {
        roles: true,
        chats: true,
        trips: true,
        requests: true,
        liveTracking: true,
        payments: true,
        schools: true,
        selectAll: true
      }
    },
    {
      name: t("roleOperationsManager"),
      permissions: {
        roles: true,
        chats: false,
        trips: false,
        requests: false,
        liveTracking: false,
        payments: false,
        schools: false,
        selectAll: false
      }
    },
    {
      name: t("roleSupportAdmin"),
      permissions: {
        roles: true,
        chats: true,
        trips: false,
        requests: false,
        liveTracking: false,
        payments: false,
        schools: false,
        selectAll: false
      }
    }
  ])

  const togglePermission = (roleIndex: number, permissionId: string) => {
    const newRoles = [...roles]

    if (permissionId === "selectAll") {
      const newValue = !newRoles[roleIndex].permissions.selectAll
      permissions.forEach((permission) => {
        newRoles[roleIndex].permissions[permission.id] = newValue
      })
    } else {
      newRoles[roleIndex].permissions[permissionId] = !newRoles[roleIndex].permissions[permissionId]

      // Update selectAll based on other permissions
      const allChecked = permissions.filter((p) => p.id !== "selectAll").every((p) => newRoles[roleIndex].permissions[p.id])

      newRoles[roleIndex].permissions.selectAll = allChecked
    }

    setRoles(newRoles)
  }

  return (
    <div className='space-y-4'>
      <div className='rounded-md border'>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className='w-[150px]'>{t("rolesLabel")}</TableHead>
              {permissions.map((permission) => (
                <TableHead key={permission.id} className='text-center'>
                  {permission.name}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {roles.map((role, roleIndex) => (
              <TableRow key={role.name}>
                <TableCell className='font-medium'>{role.name}</TableCell>
                {permissions.map((permission) => (
                  <TableCell key={permission.id} className='text-center'>
                    <Checkbox checked={role.permissions[permission.id]} onCheckedChange={() => togglePermission(roleIndex, permission.id)} className='mx-auto' />
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className='flex justify-center'>
        <Button className='bg-[#1890ff] hover:bg-[#40a9ff]'>{t("doneButton")}</Button>
      </div>
    </div>
  )
}
