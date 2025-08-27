"use client"

import { TableSkeleton } from "@/components/common/skeletons/table"
import { DisplayError } from "@/components/common/error"
import { DataTable } from "@/components/common/data-table"
import { DriverPaymentColumns } from "./columns"
import { TableAction } from "@/components/common/table-action"
import { SimplePagination } from "@/components/common/simple-pagination"
import { usePaginatedDriverPayments } from "../../_helpers/hooks"
import { CreateDriverPaymentModal } from "./create-payment"
import { Button } from "@/components/ui/button"
import { DollarSign } from "lucide-react"

type Props = {
  sp: TObject
  driverId: number
}

export const DriverPaymentTable = ({ driverId, sp }: Props) => {
  const { data: payments, isLoading, isError, error } = usePaginatedDriverPayments(driverId, sp)

  if (isLoading) return <TableSkeleton />
  if (isError) return <DisplayError error={error} />

  return (
    <div className='space-y-2'>
      <TableAction>
        <CreateDriverPaymentModal driverId={driverId}>
          <Button variant='default' size='sm' icon={DollarSign}>
            Add Payment
          </Button>
        </CreateDriverPaymentModal>
      </TableAction>
      <DataTable data={payments?.rows!} columns={DriverPaymentColumns} />
      <SimplePagination hasNextPage={!!payments?.hasNextPage} hasPrevPage={!!payments?.hasPrevPage} />
    </div>
  )
}
