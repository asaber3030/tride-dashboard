import { capitalize, formatToEGP } from "@/lib/utils"

import { ParentPaymentsStatus } from "@/lib/lists"
import { ColumnDef } from "@tanstack/react-table"
import { FullRideGroup, Payment } from "@/types/models"
import { Badge } from "@/components/ui/badge"
import { LinkBtn } from "@/components/common/link-button"
import { Eye } from "lucide-react"
import routes from "@/lib/routes"
import { MergeGroupModal } from "./merge-groups-modal"

export const RideGroupColumns: ColumnDef<FullRideGroup>[] = [
  {
    accessorKey: "id",
    header: "ID"
  },
  {
    accessorKey: "group_name",
    header: "Group Name"
  },
  {
    accessorKey: "current_seats_taken",
    header: "Seats Taken"
  },
  {
    accessorKey: "group_type",
    header: "Group Type",
    cell: ({ row }) => {
      return capitalize(row.original.group_type)
    }
  },
  {
    accessorKey: "school.school_name",
    header: "School"
  },

  {
    accessorKey: "parent_group_subscription[0].total_amount",
    header: "Total Amount",
    cell: ({ row }) => {
      return <div>{formatToEGP(row.original.parent_group_subscription[0]?.total_amount || "0")}</div>
    }
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
          <LinkBtn icon={Eye} size='icon' variant='outline' href={routes.rideGroups.view(row.original.id)} />
          {row.original.current_seats_taken !== 5 && <MergeGroupModal rideGroup={row.original} />}
        </div>
      )
    }
  }
]
