import { diffForHumans } from "@/lib/utils"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { UpdateParentStatusModal } from "./change-status-modal"
import { ParentWithGroups } from "@/types/models"
import { ColumnDef } from "@tanstack/react-table"
import { LinkBtn } from "@/components/common/link-button"
import { Badge } from "@/components/ui/badge"
import { Eye } from "lucide-react"

import { IMAGES } from "@/lib/constants"

import routes from "@/lib/routes"

export const ParentColumns: ColumnDef<ParentWithGroups>[] = [
  {
    accessorKey: "id",
    header: "ID"
  },
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => {
      return row.original?.name
    }
  },
  {
    accessorKey: "profile_pic",
    header: "Profile Picture",
    cell: ({ row }) => {
      return (
        <Avatar>
          <AvatarImage src={row.original?.profile_pic || IMAGES.user} alt={row.original?.name} />
          <AvatarFallback>{row.original?.name?.[0]}</AvatarFallback>
        </Avatar>
      )
    }
  },
  {
    accessorKey: "phone",
    header: "Phone"
  },
  {
    accessorKey: "groups",
    header: "School",
    cell: ({ row }) => {
      return <p className='capitalize max-w-32 truncate'>{row.original.groups?.length ? row.original.groups.map((group) => group.group.school.school_name).join(", ") : "No School"}</p>
    }
  },
  {
    accessorKey: "children.length",
    header: "Children",
    cell: ({ row }) => {
      return (
        <Badge className='capitalize'>
          {row.original.children?.length || 0} {row.original.children?.length === 1 ? "Child" : "Children"}
        </Badge>
      )
    }
  },

  {
    accessorKey: "formatted_address",
    header: "Address"
  },

  {
    accessorKey: "created_at",
    header: "Created At",
    cell: ({ row }) => {
      return diffForHumans(new Date(row.original.created_at))
    }
  },
  {
    accessorKey: "actions",
    header: "Actions",
    cell: ({ row }) => {
      return (
        <div className='flex items-center gap-2'>
          <UpdateParentStatusModal currentStatus={!!row.original.documents_approved} parentId={row.original.id} />
          <LinkBtn icon={Eye} href={routes.parents.view(row.original.id)} size='icon' variant='outline' />
        </div>
      )
    }
  }
]
