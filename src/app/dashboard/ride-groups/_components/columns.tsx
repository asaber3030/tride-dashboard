import routes from "@/lib/routes"

import { capitalize, formatToEGP } from "@/lib/utils"

import { CreateChatForRideGroupModal } from "./create-chat-modal"
import { MergeGroupModal } from "./merge-groups-modal"
import { FullRideGroup } from "@/types/models"
import { Eye, Users2 } from "lucide-react"
import { ColumnDef } from "@tanstack/react-table"
import { LinkBtn } from "@/components/common/link-button"

export const RideGroupColumns: ColumnDef<FullRideGroup>[] = [
  {
    accessorKey: "id",
    header: "ID"
  },
  {
    accessorKey: "parent.name",
    header: "Parent",
    cell: ({ row }) => {
      return <div>{row.original.parentGroups?.[0]?.parent?.name || "N/A"}</div>
    }
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
    accessorKey: "actions",
    header: "Actions",
    cell: ({ row }) => {
      return (
        <div className='flex items-center gap-2'>
          <LinkBtn icon={Eye} size='icon' variant='outline' href={routes.rideGroups.view(row.original.id)} />
          <LinkBtn icon={Users2} size='icon' variant='outline' href={routes.rideGroups.viewParentGroups(row.original.id)} />
          {row.original.group_type == "regular" && <>{row.original.current_seats_taken !== 5 && <MergeGroupModal rideGroup={row.original} />}</>}
          <CreateChatForRideGroupModal group={row.original} />
        </div>
      )
    }
  }
]
