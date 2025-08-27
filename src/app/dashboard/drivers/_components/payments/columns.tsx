import { ColumnDef } from "@tanstack/react-table"

import { UpdateDriverPaymentModal } from "./update-payment"
import { DriverPayment } from "@/types/models"
import { formatToEGP } from "@/lib/utils"

export const DriverPaymentColumns: ColumnDef<DriverPayment>[] = [
  {
    accessorKey: "id",
    header: "ID"
  },
  {
    accessorKey: "driver.name",
    header: "Driver",
    cell: ({ row }) => {
      return row.original?.driver?.name + "#" + row.original?.id
    }
  },
  {
    accessorKey: "salary",
    header: "Salary",
    cell: ({ row }) => {
      return formatToEGP(`${row.original.salary}`)
    }
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      return <span className='capitalize'>{row.original.status}</span>
    }
  },
  {
    accessorKey: "issued_for",
    header: "Issued For"
  },
  {
    accessorKey: "issued_at",
    header: "Issued At"
  },
  {
    accessorKey: "actions",
    header: "Actions",
    cell: ({ row }) => {
      return (
        <div className='flex items-center gap-2'>
          <UpdateDriverPaymentModal payment={row.original} />
        </div>
      )
    }
  }
]
