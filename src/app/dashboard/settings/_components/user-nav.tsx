import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Bell } from "lucide-react"

export function UserNav() {
  return (
    <div className='flex items-center gap-4'>
      <button className='relative'>
        <Bell className='h-5 w-5 text-gray-500' />
        <span className='absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500'></span>
      </button>
      <div className='flex items-center gap-2'>
        <Avatar className='h-8 w-8'>
          <AvatarImage src='/placeholder.svg' alt='Ahmed Mohamad' />
          <AvatarFallback>AM</AvatarFallback>
        </Avatar>
        <div className='text-sm'>
          <p className='font-medium'>Ahmed Mohamad</p>
        </div>
      </div>
    </div>
  )
}
