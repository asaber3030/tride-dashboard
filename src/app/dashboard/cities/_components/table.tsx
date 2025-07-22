"use client"

import { usePaginatedCities } from "../_helpers/hooks"

import { TableSkeleton } from "@/components/common/skeletons/table"
import { DisplayError } from "@/components/common/error"
import { DataTable } from "@/components/common/data-table"
import { CitiesColumns } from "./columns"
import { SimplePagination } from "@/components/common/simple-pagination"
import { CreateCityModal } from "./create"
import { TableAction } from "@/components/common/table-action"

type Props = {
  sp: TObject
}

export const CitiesTable = ({ sp = {} }: Props) => {
  const { data: cities, isLoading, isError, error } = usePaginatedCities(sp)

  if (isLoading) return <TableSkeleton />
  if (isError) return <DisplayError error={error} />

  return (
    <div className='space-y-4'>
      <TableAction>
        <CreateCityModal />
      </TableAction>
      <DataTable data={cities?.rows!} columns={CitiesColumns} />
      <SimplePagination hasNextPage={cities?.hasNextPage!} hasPrevPage={cities?.hasPrevPage!} />
    </div>
  )
}
