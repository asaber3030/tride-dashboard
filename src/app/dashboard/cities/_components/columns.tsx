import { IMAGES } from "@/lib/constants"
import { capitalize } from "@/lib/utils"
import { City } from "@/types/models"
import { ColumnDef } from "@tanstack/react-table"
import { UpdateCityModal } from "./update"
import { DeleteModal } from "@/components/common/delete-modal"
import { deleteCityAction } from "../_helpers/actions"

export const CitiesColumns: ColumnDef<City>[] = [
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
    accessorKey: "governorate.name",
    header: "Governorate",
    cell: ({ row }) => {
      return capitalize(row.original?.governorate?.governorate_name)
    }
  },

  {
    accessorKey: "actions",
    header: "Actions",
    cell: ({ row }) => {
      return (
        <div className='flex items-center gap-2'>
          <UpdateCityModal city={row.original} />
          <DeleteModal deletedId={row.original.id} forceAction={deleteCityAction} />
        </div>
      )
    }
  }
]
