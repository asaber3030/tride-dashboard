import { IMAGES } from "@/lib/constants"
import { capitalize } from "@/lib/utils"
import { Admin } from "@/types/models"
import { ColumnDef } from "@tanstack/react-table"
import { UpdateAdminRoleModal } from "./update-role"

export const AdminsColumns: ColumnDef<Admin>[] = [
  {
    accessorKey: "id",
    header: "ID"
  },
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => {
      return row.original.first_name + " " + row.original.last_name
    }
  },
  {
    accessorKey: "profile_pic",
    header: "Profile Picture",
    cell: ({ row }) => {
      return <img className='size-10 rounded-full' src={row.original?.profile_pic || IMAGES.user} />
    }
  },
  {
    accessorKey: "account.email",
    header: "Email"
  },
  {
    accessorKey: "role",
    header: "Role",
    cell: ({ row }) => {
      return capitalize(row.original.role.role_name)
    }
  },
  {
    accessorKey: "language",
    header: "Language"
  },
  {
    accessorKey: "actions",
    header: "Actions",
    cell: ({ row }) => {
      return (
        <div className='flex items-center gap-2'>
          <UpdateAdminRoleModal admin={row.original} />
        </div>
      )
    }
  }
]
