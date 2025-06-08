"use client"

import { useIsMobile } from "@/hooks/use-mobile"
import { useState } from "react"
import { ChatSidebar } from "./sidebar"
import { ChatMessages } from "./messages"
import { DriverInfo } from "./driver-info"

export function ChatInterface() {
  const isMobile = useIsMobile()
  const [activeView, setActiveView] = useState<"chat" | "info" | "sidebar">("chat")

  // On mobile, we'll show only one panel at a time
  const handleViewChange = (view: "chat" | "info" | "sidebar") => {
    if (isMobile) {
      setActiveView(view)
    }
  }

  return (
    <div className='flex h-screen bg-white'>
      {/* Sidebar - hidden on mobile unless activeView is sidebar */}
      <div className={`${isMobile ? (activeView === "sidebar" ? "block w-full" : "hidden") : "block w-[340px] border-r border-gray-200"}`}>
        <ChatSidebar onViewChange={handleViewChange} />
      </div>

      {/* Chat Messages - hidden on mobile unless activeView is chat */}
      <div className={`${isMobile ? (activeView === "chat" ? "block w-full" : "hidden") : "flex-1 flex flex-col"}`}>
        <ChatMessages onViewChange={handleViewChange} />
      </div>

      {/* Driver Info - hidden on mobile unless activeView is info */}
      <div className={`${isMobile ? (activeView === "info" ? "block w-full" : "hidden") : "w-[280px] border-l border-gray-200"}`}>
        <DriverInfo onViewChange={handleViewChange} />
      </div>
    </div>
  )
}
