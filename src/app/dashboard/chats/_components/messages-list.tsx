import { DefaultLoading } from "@/components/common/loader"
import { Button } from "@/components/ui/button"
import { ChatMessage } from "@/types/models"
import { Loader } from "lucide-react"
import { Fragment } from "react"
import { MessageContent } from "./message-content"
import { useUser } from "@/hooks/auth/use-user"
import { useTranslations } from "next-intl"

type Props = {
  isMessagesLoading: boolean
  messagesStartRef: React.RefObject<HTMLDivElement | null>
  messagesEndRef: React.RefObject<HTMLDivElement | null>
  scrollContainerRef: React.RefObject<HTMLDivElement | null>
  mainMessages: ChatMessage[]
  hasNextPage: boolean
  isFetchingNextPage: boolean
  fetchNextPage: () => void
  setPage: React.Dispatch<React.SetStateAction<number>>
  specificParticipant: (id: number) => { name: string } | undefined
}

export const MessagesList = ({ isMessagesLoading, messagesStartRef, messagesEndRef, scrollContainerRef, mainMessages, hasNextPage, isFetchingNextPage, fetchNextPage, setPage, specificParticipant }: Props) => {
  const t = useTranslations()

  const { user } = useUser()

  return (
    <div className='flex-1 overflow-y-auto flex flex-col p-4 space-y-4' ref={scrollContainerRef}>
      {isMessagesLoading ? (
        <div className='h-full flex flex-col items-center justify-center'>
          <DefaultLoading variant='pinwheel' />
        </div>
      ) : (
        <Fragment>
          <div ref={messagesStartRef} />
          {hasNextPage && (
            <Button
              disabled={isMessagesLoading || isFetchingNextPage || !hasNextPage}
              className='w-fit mx-auto flex gap-2 items-center'
              onClick={() => {
                fetchNextPage()
                setPage((prev) => prev + 1)
              }}
            >
              {isFetchingNextPage && <Loader className='size-4 animate-spin' />}
              {t("loadMore")}
            </Button>
          )}
          {mainMessages.map((msg) => {
            const sender = specificParticipant(msg.sender_id)?.name || `${user?.first_name} ${user?.last_name}`
            return <MessageContent message={msg} sender={sender} key={msg._id} />
          })}
          <div ref={messagesEndRef} />
        </Fragment>
      )}
    </div>
  )
}
