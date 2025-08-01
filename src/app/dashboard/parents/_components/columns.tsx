import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { IMAGES } from "@/lib/constants"
import { capitalize, diffForHumans } from "@/lib/utils"
import { Parent } from "@/types/models"
import { ColumnDef } from "@tanstack/react-table"
import { UpdateParentStatusModal } from "./change-status-modal"
import { LinkBtn } from "@/components/common/link-button"
import { Eye } from "lucide-react"
import routes from "@/lib/routes"

export const ParentColumns: ColumnDef<Parent>[] = [
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
    accessorKey: "children.length",
    header: "children",
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
