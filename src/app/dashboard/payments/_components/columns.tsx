import { capitalize, formatToEGP } from "@/lib/utils"

import { ParentPaymentsStatus } from "@/lib/lists"
import { ColumnDef } from "@tanstack/react-table"
import { Payment } from "@/types/models"
import { Badge } from "@/components/ui/badge"
import { LinkBtn } from "@/components/common/link-button"
import { Eye } from "lucide-react"
import routes from "@/lib/routes"

export const PaymentsColumns: ColumnDef<Payment>[] = [
  {
    accessorKey: "id",
    header: "ID"
  },
  {
    accessorKey: "parent.name",
    header: "Parent Name"
  },
  {
    accessorKey: "total_amount",
    header: "Total Amount",
    cell: ({ row }) => {
      return <div className='text-right'>{formatToEGP(row.original.total_amount)}</div>
    }
  },
  {
    accessorKey: "current_seats_taken",
    header: "Seats Taken"
  },
  {
    accessorKey: "rideGroup.group_name",
    header: "Group Name"
  },
  {
    accessorKey: "rideGroup.group_type",
    header: "Group Type"
  },
  {
    accessorKey: "rideGroup.school.school_name",
    header: "School"
  },
  {
    accessorKey: "pickup_days_count",
    header: "Pickup Days"
  },
  {
    accessorKey: "plan.months_count",
    header: "Plan Montions"
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      return <Badge variant={ParentPaymentsStatus[row.original.status as keyof typeof ParentPaymentsStatus] || ("outlineGray" as any)}>{capitalize(row.original.status || "unknown")}</Badge>
    }
  },
  {
    accessorKey: "actions",
    header: "Actions",
    cell: ({ row }) => {
      return (
        <div className='flex items-center gap-2'>
          <LinkBtn icon={Eye} size='icon' variant='outline' href={routes.viewPayment(row.original.id)} />
        </div>
      )
    }
  }
]
