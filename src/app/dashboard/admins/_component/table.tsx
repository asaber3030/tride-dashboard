"use client"

import { TableSkeleton } from "@/components/common/skeletons/table"
import { useAdmins } from "../_helpers/hooks"
import { DisplayError } from "@/components/common/error"
import { DataTable } from "@/components/common/data-table"
import { AdminsColumns } from "./columns"
import { TableAction } from "@/components/common/table-action"
import { Button } from "@/components/ui/button"
import { CreateAdminModal } from "./create"

type Props = {
  sp: TObject
}

export const AdminsTable = ({ sp = {} }: Props) => {
  const { data: admins, isLoading, isError, error } = useAdmins(sp)

  if (isLoading) return <TableSkeleton />
  if (isError) return <DisplayError error={error} />

  return (
    <div>
      <TableAction>
        <CreateAdminModal />
      </TableAction>
      <DataTable data={admins!} columns={AdminsColumns} />
    </div>
  )
}
