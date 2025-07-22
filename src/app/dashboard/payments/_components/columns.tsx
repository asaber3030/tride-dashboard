import { Payment } from "@/types/models"
import { ColumnDef } from "@tanstack/react-table"

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
    header: "Total Amount"
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
    accessorKey: "plan.months_count",
    header: "Plan Montions"
  },
  {
    accessorKey: "plan.months_count",
    header: "Plan Montions"
  },
  {
    accessorKey: "plan.months_count",
    header: "Plan Montions"
  },
  {
    accessorKey: "plan.months_count",
    header: "Plan Montions"
  },
  {
    accessorKey: "remaining_months",
    header: "Remaining Months"
  },
  {
    accessorKey: "months_paid_done",
    header: "Months Paid"
  },
  {
    accessorKey: "actions",
    header: "Actions",
    cell: ({ row }) => {
      return <div className='flex items-center gap-2'></div>
    }
  }
]
