"use client"

import { useState } from "react"
import { Search, MessageSquare, Clock } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { useIsMobile } from "@/hooks/use-mobile"
import { IMAGES } from "@/lib/constants"
import { useLocale, useTranslations } from "next-intl"
import { cn } from "@/lib/utils"

interface ChatSidebarProps {
  onViewChange: (view: "chat" | "info" | "sidebar") => void
}

export function ChatSidebar({ onViewChange }: ChatSidebarProps) {
  const isMobile = useIsMobile()
  const locale = useLocale()
  const t = useTranslations()

  const [activeTab, setActiveTab] = useState("all")

  return (
    <div className='flex flex-col h-full'>
      {/* Search and navigation */}
      <div className='border-b border-gray-200'>
        <div className='relative'>
          <Search className='absolute left-2.5 top-2.5 h-4 w-4 text-gray-400' />
          <Input type='search' placeholder={t("searchPlaceholder")} className='pl-8 bg-gray-50' />
        </div>

        <div className='flex flex-col mt-4 space-x-2 mb-4'>
          <Tabs defaultValue='all' className='flex-1 flex flex-col'>
            <TabsList className='grid rounded-none grid-cols-2 p-0 h-auto bg-transparent border-b border-gray-200 w-full'>
              <TabsTrigger value='all' className='data-[state=active]:border-b-2 data-[state=active]:border-b-blue-500 data-[state=active]:shadow-none rounded-none py-2' onClick={() => setActiveTab("all")}>
                {t("customerServicesTab")}
              </TabsTrigger>
              <TabsTrigger value='parents' className='data-[state=active]:border-b-2 data-[state=active]:border-b-blue-500 data-[state=active]:shadow-none rounded-none py-2' onClick={() => setActiveTab("parents")}>
                {t("goToChatTab")}
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>

      {/* Tabs */}
      <Tabs defaultValue='all' className='flex-1 flex flex-col'>
        <TabsList className='grid rounded-none grid-cols-4 p-0 h-auto bg-transparent border-b border-gray-200 w-full'>
          <TabsTrigger value='all' className='data-[state=active]:border-b-2 data-[state=active]:border-b-blue-500 data-[state=active]:shadow-none rounded-none py-2' onClick={() => setActiveTab("all")}>
            {t("allTab")}
          </TabsTrigger>
          <TabsTrigger value='parents' className='data-[state=active]:border-b-2 data-[state=active]:border-b-blue-500 data-[state=active]:shadow-none rounded-none py-2' onClick={() => setActiveTab("parents")}>
            {t("parentsTab")}
          </TabsTrigger>
          <TabsTrigger value='drivers' className='data-[state=active]:border-b-2 data-[state=active]:border-b-blue-500 data-[state=active]:shadow-none rounded-none py-2' onClick={() => setActiveTab("drivers")}>
            {t("driversTab")}
          </TabsTrigger>
          <TabsTrigger value='unread' className='data-[state=active]:border-b-2 data-[state=active]:border-b-blue-500 data-[state=active]:shadow-none rounded-none py-2' onClick={() => setActiveTab("unread")}>
            {t("unreadTab")}
          </TabsTrigger>
        </TabsList>

        <TabsContent value='all' className='flex-1 overflow-y-auto mt-0 p-0'>
          <ChatList onViewChange={onViewChange} />
        </TabsContent>
        <TabsContent value='parents' className='flex-1 overflow-y-auto mt-0 p-0'>
          <ChatList onViewChange={onViewChange} filterRole='parent' />
        </TabsContent>
        <TabsContent value='drivers' className='flex-1 overflow-y-auto mt-0 p-0'>
          <ChatList onViewChange={onViewChange} filterRole='driver' />
        </TabsContent>
        <TabsContent value='unread' className='flex-1 overflow-y-auto mt-0 p-0'>
          <ChatList onViewChange={onViewChange} filterUnread />
        </TabsContent>
      </Tabs>

      {/* Mobile navigation buttons */}
      {isMobile && (
        <div className='p-4 border-t border-gray-200 flex space-x-2'>
          <Button variant='outline' className='flex-1' onClick={() => onViewChange("chat")}>
            {t("goToChatButton")}
          </Button>
        </div>
      )}
    </div>
  )
}

interface ChatListProps {
  onViewChange: (view: "chat" | "info" | "sidebar") => void
  filterRole?: "parent" | "driver"
  filterUnread?: boolean
}

function ChatList({ onViewChange, filterRole, filterUnread }: ChatListProps) {
  const t = useTranslations()
  const locale = useLocale()
  const chats = [
    {
      id: 1,
      name: t("chatName1"),
      role: "driver",
      avatar: IMAGES.user,
      lastMessage: t("chatLastMessage"),
      time: t("chatTime1"),
      unread: true
    },
    {
      id: 2,
      name: t("chatName2"),
      role: "parent",
      avatar: IMAGES.user,
      lastMessage: t("chatLastMessage"),
      time: t("chatTime1"),
      unread: false
    },
    {
      id: 3,
      name: t("chatName1"),
      role: "driver",
      avatar: IMAGES.user,
      lastMessage: t("chatLastMessage"),
      time: t("chatTime1"),
      unread: true
    },
    {
      id: 4,
      name: t("chatName2"),
      role: "parent",
      avatar: IMAGES.user,
      lastMessage: t("chatLastMessage"),
      time: t("chatTime2"),
      unread: false
    },
    {
      id: 5,
      name: t("chatName1"),
      role: "driver",
      avatar: IMAGES.user,
      lastMessage: t("chatLastMessage"),
      time: t("chatTime3"),
      unread: false
    }
  ]

  // Filter chats based on props
  const filteredChats = chats.filter((chat) => {
    if (filterRole && chat.role !== filterRole) return false
    if (filterUnread && !chat.unread) return false
    return true
  })

  return (
    <div>
      {filteredChats.map((chat) => (
        <div key={chat.id} className={cn("flex items-center p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer", locale === "en" ? "flex-row" : "flex-row-reverse")} onClick={() => onViewChange("chat")}>
          <div className='relative mr-3'>
            <img src={chat.avatar || "/placeholder.svg"} alt={chat.name} className='w-10 h-10 rounded-full object-cover' />
            {chat.unread && <span className='absolute top-0 right-0 w-2.5 h-2.5 bg-blue-500 rounded-full border-2 border-white'></span>}
          </div>
          <div className='flex-1 min-w-0'>
            <div className={cn("flex justify-between items-center", locale === "en" ? "flex-row" : "flex-row-reverse")}>
              <h3 className='text-sm font-medium truncate'>{chat.name}</h3>
              <span className='text-xs text-gray-500'>{chat.time}</span>
            </div>
            <div className={cn("flex items-center", locale === "en" ? "flex-row" : "flex-row-reverse")}>
              <span className={`text-xs px-1.5 py-0.5 rounded mr-2 ${chat.role === "driver" ? "bg-orange-100 text-orange-800" : "bg-blue-100 text-blue-800"}`}>{chat.role === "driver" ? t("driverRole") : t("parentRole")}</span>
              <p className='text-xs text-gray-500 truncate'>{chat.lastMessage}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
