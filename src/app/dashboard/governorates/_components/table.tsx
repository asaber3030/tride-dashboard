"use client"

import { usePaginatedGovernorates } from "../_helpers/hooks"

import { CreateGovernorateModal } from "./create"
import { GovernoratesColumns } from "./columns"
import { SimplePagination } from "@/components/common/simple-pagination"
import { TableSkeleton } from "@/components/common/skeletons/table"
import { DisplayError } from "@/components/common/error"
import { TableAction } from "@/components/common/table-action"
import { DataTable } from "@/components/common/data-table"

type Props = {
  sp: TObject
}

export const GovernoratesTable = ({ sp = {} }: Props) => {
  const { data: governorates, isLoading, isError, error } = usePaginatedGovernorates(sp)

  if (isLoading) return <TableSkeleton />
  if (isError) return <DisplayError error={error} />

  return (
    <div className='space-y-4'>
      <TableAction>
        <CreateGovernorateModal />
      </TableAction>
      <DataTable data={governorates?.rows!} columns={GovernoratesColumns} />
      <SimplePagination hasNextPage={governorates?.hasNextPage!} hasPrevPage={governorates?.hasPrevPage!} />
    </div>
  )
}
