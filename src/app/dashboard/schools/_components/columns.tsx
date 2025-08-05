import { School } from "@/types/models"
import { ColumnDef } from "@tanstack/react-table"
import { DeleteModal } from "@/components/common/delete-modal"
import { deleteSchoolAction } from "../_helpers/actions"
import { LinkBtn } from "@/components/common/link-button"
import { Edit } from "lucide-react"
import routes from "@/lib/routes"

export const SchoolsColumns: ColumnDef<School>[] = [
  {
    accessorKey: "id",
    header: "ID"
  },
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => {
      return row.original?.school_name
    }
  },
  {
    accessorKey: "city.name",
    header: "City",
    cell: ({ row }) => {
      return row.original?.city?.name
    }
  },
  {
    accessorKey: "actions",
    header: "Actions",
    cell: ({ row }) => {
      return (
        <div className='flex items-center gap-2'>
          <LinkBtn icon={Edit} href={routes.updateSchool(row.original.id)} size='icon' />
          <DeleteModal deletedId={row.original.id} forceAction={deleteSchoolAction} />
        </div>
      )
    }
  }
]
