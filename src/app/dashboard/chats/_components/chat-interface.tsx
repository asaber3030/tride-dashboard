"use client"

import { useIsMobile } from "@/hooks/use-mobile"
import { useState } from "react"
import { ChatSidebar } from "./sidebar"
import { ChatMessages } from "./messages"

type Props = {
  type: TChatRoomType
  chatRoomId: string
  sp: TObject
}

export function SingleChatInterface({ chatRoomId, type, sp }: Props) {
  const isMobile = useIsMobile()
  const [activeView, setActiveView] = useState<"chat" | "info" | "sidebar">("chat")

  return (
    <div className='flex h-screen bg-white'>
      <div className={`${isMobile ? (activeView === "sidebar" ? "block w-full" : "hidden") : "block w-[340px] border-r border-gray-200"}`}>
        <ChatSidebar type={type} sp={sp} />
      </div>

      <div className={`${isMobile ? (activeView === "chat" ? "block w-full" : "hidden") : "flex-1 flex flex-col"}`}>
        <ChatMessages type={type} chatRoomId={chatRoomId} />
      </div>

      <div className={`${isMobile ? (activeView === "info" ? "block w-full" : "hidden") : "hidden"} flex-1 border-l border-gray-200`}>
        <div className='p-4'>
          <h2 className='text-lg font-semibold'>Chat Info</h2>
          <p className='text-gray-600'>Details about the chat will go here.</p>
        </div>
      </div>
    </div>
  )
}
