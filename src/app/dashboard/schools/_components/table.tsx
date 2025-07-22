"use client"

import { usePaginatedSchools } from "../_helpers/hooks"

import { TableSkeleton } from "@/components/common/skeletons/table"
import { DisplayError } from "@/components/common/error"
import { DataTable } from "@/components/common/data-table"
import { SchoolsColumns } from "./columns"
import { SimplePagination } from "@/components/common/simple-pagination"
import { CreateSchoolModal } from "./create"
import { TableAction } from "@/components/common/table-action"

type Props = {
  sp: TObject
}

export const SchoolsTable = ({ sp = {} }: Props) => {
  const { data: schools, isLoading, isError, error } = usePaginatedSchools(sp)

  if (isLoading) return <TableSkeleton />
  if (isError) return <DisplayError error={error} />

  return (
    <div className='space-y-4'>
      <TableAction>
        <CreateSchoolModal />
      </TableAction>
      <DataTable data={schools?.rows!} columns={SchoolsColumns} />
      <SimplePagination hasNextPage={schools?.hasNextPage!} hasPrevPage={schools?.hasPrevPage!} />
    </div>
  )
}
