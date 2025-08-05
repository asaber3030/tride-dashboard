"use client"

import { useIsMobile } from "@/hooks/use-mobile"
import { ChatSidebar } from "./sidebar"

type Props = {
  sp: TObject
  type: TChatRoomType
}

export function ChatsInterface({ type, sp }: Props) {
  return (
    <div className='flex h-screen bg-white border py-2 rounded-md'>
      <div className={"block w-[340px] border-r border-gray-200 px-2"}>
        <ChatSidebar type={type} sp={sp} />
      </div>

      <div className='flex flex-1 flex-col items-center justify-center text-2xl font-semibold'>Select Chat To Open Messages</div>
    </div>
  )
}
