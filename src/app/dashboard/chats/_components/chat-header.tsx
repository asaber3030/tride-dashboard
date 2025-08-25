import { DisplayError } from "@/components/common/error"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Skeleton } from "@/components/ui/skeleton"
import { IMAGES } from "@/lib/constants"
import { ChatParticipant } from "@/types/models"

type Props = {
  isLoading: boolean
  isError: boolean
  error: Error | null
  participants: ChatParticipant[] | undefined
}

export const ChatHeader = ({ isLoading, isError, error, participants }: Props) => {
  if (isLoading) return <ChatHeaderLoading />
  if (isError) return <DisplayError error={error} />

  const names = participants?.map((part) => part.name).join(", ")
  const types = participants?.map((part) => part.user_type).join(", ")

  return (
    <div className='flex items-center justify-between p-4 border-b border-gray-200'>
      {isLoading ? (
        <ChatHeaderLoading />
      ) : (
        <div className='flex items-center'>
          <Avatar className='h-10 w-10 mr-3'>
            <AvatarImage src={IMAGES.user} alt='Participant' />
            <AvatarFallback>AH</AvatarFallback>
          </Avatar>
          <div>
            <h2 className='text-sm font-medium'>{names}</h2>
            <div className='flex items-center'>
              <span className='text-xs px-1.5 py-0.5 rounded bg-orange-100 text-orange-800 capitalize'>{types}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

const ChatHeaderLoading = () => {
  return (
    <div className='flex items-center justify-between p-4 border-b border-gray-200'>
      <div className='flex items-center gap-4'>
        <Skeleton className='size-10 rounded-full' />
        <div>
          <Skeleton className='w-24 h-4 mt-1' />
          <Skeleton className='w-16 h-3 mt-1' />
        </div>
      </div>
    </div>
  )
}
