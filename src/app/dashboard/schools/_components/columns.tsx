import { School } from "@/types/models"
import { ColumnDef } from "@tanstack/react-table"
import { UpdateSchoolModal } from "./update"
import { DeleteModal } from "@/components/common/delete-modal"
import { deleteSchoolAction } from "../_helpers/actions"

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
          <UpdateSchoolModal school={row.original} />
          <DeleteModal deletedId={row.original.id} forceAction={deleteSchoolAction} />
        </div>
      )
    }
  }
]
