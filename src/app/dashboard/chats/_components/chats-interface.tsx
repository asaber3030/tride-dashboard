"use client"

import { useIsMobile } from "@/hooks/use-mobile"
import { useState } from "react"
import { ChatSidebar } from "./sidebar"

type Props = {
  sp: TObject
  type: TChatRoomType
}

export function ChatsInterface({ type, sp }: Props) {
  const isMobile = useIsMobile()
  const [activeView, setActiveView] = useState<"chat" | "info" | "sidebar">("chat")

  return (
    <div className='flex h-screen bg-white'>
      <div className={`${isMobile ? (activeView === "sidebar" ? "block w-full" : "hidden") : "block w-[340px] border-r border-l px-2 border-gray-200"}`}>
        <ChatSidebar type={type} sp={sp} />
      </div>

      <div className='flex flex-1 flex-col items-center justify-center text-2xl font-semibold'>Select Chat To Open Messages</div>
    </div>
  )
}
