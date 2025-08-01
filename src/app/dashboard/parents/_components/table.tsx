"use client"

import { TableSkeleton } from "@/components/common/skeletons/table"
import { usePaginatedParents } from "../_helpers/hooks"
import { DisplayError } from "@/components/common/error"
import { DataTable } from "@/components/common/data-table"
import { ParentColumns } from "./columns"
import { TableAction } from "@/components/common/table-action"
import { SimplePagination } from "@/components/common/simple-pagination"

type Props = {
  sp: TObject
}

export const ParentsTable = ({ sp = {} }: Props) => {
  const { data: parents, isLoading, isError, error } = usePaginatedParents(sp)

  console.log({ parents })

  if (isLoading) return <TableSkeleton />
  if (isError) return <DisplayError error={error} />

  return (
    <div className='space-y-2'>
      <TableAction></TableAction>
      <DataTable data={parents?.rows!} columns={ParentColumns} />
      <SimplePagination hasNextPage={parents?.hasNextPage} hasPrevPage={parents?.hasPreviousPage} />
    </div>
  )
}
