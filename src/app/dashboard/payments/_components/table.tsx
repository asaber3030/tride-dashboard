"use client"

import { usePaginatedPayments } from "../_helpers/hooks"

import { SimplePagination } from "@/components/common/simple-pagination"
import { PaymentsColumns } from "./columns"
import { PaymentsFilters } from "./filters"
import { TableSkeleton } from "@/components/common/skeletons/table"
import { DisplayError } from "@/components/common/error"
import { DataTable } from "@/components/common/data-table"

type Props = {
  sp: TObject
}

export const PaymentsTable = ({ sp = {} }: Props) => {
  const { data: payments, isLoading, isError, error } = usePaginatedPayments(sp)

  if (isLoading) return <TableSkeleton />
  if (isError) return <DisplayError error={error} />

  return (
    <div className='space-y-4'>
      <PaymentsFilters />
      <DataTable data={payments?.payments!} columns={PaymentsColumns} />
      <SimplePagination hasNextPage={!!payments?.pagination.nextPage} hasPrevPage={!!payments?.pagination?.lastPage} />
    </div>
  )
}
