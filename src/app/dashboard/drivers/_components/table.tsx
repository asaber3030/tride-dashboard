"use client"

import { TableSkeleton } from "@/components/common/skeletons/table"
import { usePaginatedDrivers } from "../_helpers/hooks"
import { DisplayError } from "@/components/common/error"
import { DataTable } from "@/components/common/data-table"
import { DriversColumns } from "./columns"
import { TableAction } from "@/components/common/table-action"
import { SimplePagination } from "@/components/common/simple-pagination"

type Props = {
  sp: TObject
}

export const DriversTable = ({ sp = {} }: Props) => {
  const { data: drivers, isLoading, isError, error } = usePaginatedDrivers(sp)

  console.log({ drivers })

  if (isLoading) return <TableSkeleton />
  if (isError) return <DisplayError error={error} />

  return (
    <div className='space-y-2'>
      <TableAction></TableAction>
      <DataTable data={drivers?.drivers!} columns={DriversColumns} />
      <SimplePagination hasNextPage={!!drivers?.pagination?.nextPage} hasPrevPage={!!drivers?.pagination?.lastPage} />
    </div>
  )
}
