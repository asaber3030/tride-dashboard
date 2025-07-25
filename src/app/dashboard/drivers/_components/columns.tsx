import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { IMAGES } from "@/lib/constants"
import { capitalize, diffForHumans } from "@/lib/utils"
import { Driver } from "@/types/models"
import { ColumnDef } from "@tanstack/react-table"
import { UpdateDriverStatusModal } from "./change-status-modal"
import { LinkBtn } from "@/components/common/link-button"
import { Eye } from "lucide-react"
import routes from "@/lib/routes"

export const DriversColumns: ColumnDef<Driver>[] = [
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
    accessorKey: "papers",
    header: "Papers Submitted",
    cell: ({ row }) => {
      return <Badge variant={row.original?.papers?.id ? "success" : "destructive"}>{row.original?.papers?.id ? "Yes" : "N/A"}</Badge>
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
    accessorKey: "license_number",
    header: "License Number"
  },
  {
    accessorKey: "formatted_address",
    header: "Address"
  },
  {
    accessorKey: "gender",
    header: "Gender",
    cell: ({ row }) => {
      return capitalize(row.original.gender)
    }
  },
  {
    accessorKey: "papers?.approved",
    header: "Approved",
    cell: ({ row }) => {
      return <Badge variant={row.original?.papers?.approved ? "success" : "destructive"}>{row.original?.papers?.approved ? "Yes" : "No"}</Badge>
    }
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
          <UpdateDriverStatusModal currentStatus={!!row.original.papers?.approved} driverId={row.original.id} />
          <LinkBtn icon={Eye} href={routes.viewDriver(row.original.id)} size='icon' variant='outline' />
        </div>
      )
    }
  }
]
