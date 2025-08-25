"use client"

import { usePaginatedParents } from "../_helpers/hooks"

import { TableSkeleton } from "@/components/common/skeletons/table"
import { DisplayError } from "@/components/common/error"
import { DataTable } from "@/components/common/data-table"
import { ParentColumns } from "./columns"
import { TableAction } from "@/components/common/table-action"
import { SimplePagination } from "@/components/common/simple-pagination"
import { ParentsTableFilters } from "./filters"
import { ExportParentsButton } from "./export-button"

type Props = {
  sp: TObject
}

export const ParentsTable = ({ sp = {} }: Props) => {
  const { data: parents, isLoading, isError, error } = usePaginatedParents(sp)

  if (isLoading) return <TableSkeleton />
  if (isError) return <DisplayError error={error} />

  return (
    <div className='space-y-2'>
      <TableAction>
        <ParentsTableFilters sp={sp} />
      </TableAction>
      <DataTable data={parents?.rows!} columns={ParentColumns} />
      <SimplePagination hasNextPage={parents?.hasNextPage} hasPrevPage={parents?.hasPreviousPage} />
    </div>
  )
}
