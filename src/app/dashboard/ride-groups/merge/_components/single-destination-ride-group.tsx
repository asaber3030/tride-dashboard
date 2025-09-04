import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"
import { FullRideGroup } from "@/types/models"

type Props = {
  group: FullRideGroup
  destinationId: number | undefined
  setDestinationId: (id: number) => void
}

export const MergeSingleDestinationRideGroup = ({ destinationId, group, setDestinationId }: Props) => {
  return (
    <div onClick={() => setDestinationId(group.id)} className={cn("border rounded-md mb-2 bg-white shadow-sm hover:shadow-md transition-shadow duration-200 cursor-pointer select-none", destinationId === group.id ? "border-blue-500" : "border-gray-200")}>
      <div className='flex items-center justify-between p-2 border-b'>
        <div className='w-full'>
          <h2 className='font-semibold'>{group.group_name}</h2>
          <Separator className='my-1' />
          <ul className='space-y-1'>
            <li className='text-sm text-muted-foreground capitalize flex items-center justify-between'>
              <span className='font-semibold'>Parent:</span> <span>{group.creator?.name || "N/A"}</span>
            </li>
            <li className='text-sm text-muted-foreground capitalize flex items-center justify-between'>
              <span className='font-semibold'>ID:</span> <span>{group.id}</span>
            </li>
            <li className='text-sm text-muted-foreground capitalize flex items-center justify-between'>
              <span className='font-semibold'>School:</span> <span>{group.school.school_name}</span>
            </li>
            <li className='text-sm text-muted-foreground capitalize flex items-center justify-between'>
              <span className='font-semibold'>Current Seats Taken:</span> <span>{group.current_seats_taken} seats</span>
            </li>
            <li className='text-sm text-muted-foreground capitalize flex items-center justify-between'>
              <span className='font-semibold'>Days:</span> <span>{group.dayDates.map((item) => item.date_day + " ")}</span>
            </li>
            <li className='text-sm text-muted-foreground capitalize flex items-center justify-between'>
              <span className='font-semibold'>Driver:</span> <span>{group.driver ? group.driver?.name : <p className='text-red-500'>Not Assigned</p>}</span>
            </li>
            <li className='text-sm text-muted-foreground capitalize flex items-center justify-between'>
              <span className='font-semibold'>Group Type:</span> <span>{group.group_type}</span>
            </li>
            <li className='text-sm text-muted-foreground capitalize flex items-center justify-between'>
              <span className='font-semibold'>Created At:</span> <span>{new Date(group.created_at).toLocaleDateString()}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
