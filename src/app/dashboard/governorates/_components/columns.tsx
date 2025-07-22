import { UpdateGovernorateModal } from "./update"
import { Governorate } from "@/types/models"
import { DeleteModal } from "@/components/common/delete-modal"
import { ColumnDef } from "@tanstack/react-table"

import { deleteGovernorateAction } from "../_helpers/actions"
import qk from "@/lib/query-keys"

export const GovernoratesColumns: ColumnDef<Governorate>[] = [
  {
    accessorKey: "id",
    header: "ID"
  },
  {
    accessorKey: "governorate_name",
    header: "Name",
    cell: ({ row }) => {
      return row.original?.governorate_name
    }
  },
  {
    accessorKey: "actions",
    header: "Actions",
    cell: ({ row }) => {
      return (
        <div className='flex items-center gap-2'>
          <UpdateGovernorateModal governorate={row.original} />
          <DeleteModal forceAction={deleteGovernorateAction} deletedId={row.original.id} queryKey={qk.governorates.index()} />
        </div>
      )
    }
  }
]
