"use client"

import { ChatSidebar } from "./sidebar"
import { ChatMessages } from "./messages"
import { ChatInfo } from "./chat-info"

type Props = {
  type: TChatRoomType
  chatRoomId: string
  sp: TObject
}

export function SingleChatInterface({ chatRoomId, type, sp }: Props) {
  return (
    <div className='xl:flex h-screen bg-white border py-2 rounded-md'>
      <div className={"block w-[340px] border-r border-gray-200 px-2"}>
        <ChatSidebar type={type} sp={sp} />
      </div>

      <div className={"flex-1 flex flex-col"}>
        <ChatMessages type={type} chatRoomId={chatRoomId} />
      </div>

      <ChatInfo chatRoomId={chatRoomId} />
    </div>
  )
}
