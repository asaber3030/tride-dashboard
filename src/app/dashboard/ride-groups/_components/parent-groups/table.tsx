"use client"

import { usePaginatedRideGroups, useParentGroupsOfGroup } from "../../_helpers/hooks"

import { SimplePagination } from "@/components/common/simple-pagination"
import { ParentGroupsColumns } from "./columns"
import { TableSkeleton } from "@/components/common/skeletons/table"
import { DisplayError } from "@/components/common/error"
import { DataTable } from "@/components/common/data-table"
import { TableAction } from "@/components/common/table-action"
import { useParams } from "next/navigation"

type Props = {
  sp: TObject
  rideGroupId: number
}

export const ParentGroupsTable = ({ rideGroupId, sp }: Props) => {
  const { data: parentGroups, isLoading, isError, error } = useParentGroupsOfGroup(rideGroupId)

  if (isLoading) return <TableSkeleton />
  if (isError) return <DisplayError error={error} />
  if (!parentGroups || parentGroups.data.length === 0) return <div className='text-center py-10'>No Parent Groups Found</div>

  return (
    <div className='space-y-4'>
      <TableAction className='justify-end w-full block'></TableAction>
      <DataTable data={parentGroups.data} columns={ParentGroupsColumns} />
    </div>
  )
}
