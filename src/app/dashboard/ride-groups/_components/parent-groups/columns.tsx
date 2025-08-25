import { capitalize, cn, formatToEGP, parentGroupStatusColor } from "@/lib/utils"

import { ParentPaymentsStatus } from "@/lib/lists"
import { ColumnDef } from "@tanstack/react-table"
import { ParentGroup } from "@/types/models"
import { Badge } from "@/components/ui/badge"
import { ChangeParentGroupStatus } from "./change-group-modal"
import { CreateParentSubscriptionForm } from "@/app/dashboard/payments/_components/create-subscription"

export const ParentGroupsColumns: ColumnDef<ParentGroup>[] = [
  {
    accessorKey: "id",
    header: "ID"
  },
  {
    accessorKey: "group.group_name",
    header: "Group Name"
  },
  {
    accessorKey: "current_seats_taken",
    header: "Seats Taken"
  },

  {
    accessorKey: "group.id",
    header: "Group ID"
  },

  {
    accessorKey: "parent.name",
    header: "Parent",
    cell: ({ row }) => {
      const parent = row.original.parent
      return <div>{parent ? parent.name + "#" + parent.id : "N/A"}</div>
    }
  },

  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      return <div className={cn("capitalize text-sm p-1 px-2 rounded-xl font-medium w-fit", parentGroupStatusColor(row.original.status as any))}>{row.original.status}</div>
    }
  },

  {
    accessorKey: "actions",
    header: "Actions",
    cell: ({ row }) => {
      return (
        <div className='flex items-center gap-2'>
          <ChangeParentGroupStatus parentGroup={row.original} />
          <CreateParentSubscriptionForm />
        </div>
      )
    }
  }
]
