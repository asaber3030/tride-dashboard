"use client"

import { useChats } from "../_helpers/hooks"
import { useLocale, useTranslations } from "next-intl"
import { useRouter } from "next/navigation"

import { FormEvent, useEffect, useMemo, useState } from "react"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { ChatBubbles } from "./chat-bubbles"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import routes from "@/lib/routes"

interface ChatSidebarProps {
  sp: TObject
  type: TChatRoomType
}

export function ChatSidebar({ type, sp }: ChatSidebarProps) {
  const router = useRouter()
  const t = useTranslations()

  const [search, setSearch] = useState("")
  const [state, setState] = useState<TObject>({})

  const stateMemo = useMemo(() => state, [state])

  const { data: chats, refetch: refetchCustomerSupport, isLoading: isChatsLoading, isError: isChatsHasError, error: chatsError } = useChats(state, type)

  const submitSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setState((prev) => ({
      ...prev,
      name: search.trim() || ""
    }))
  }

  const handleTypeChange = (type: string) => {
    setState((prev) => ({
      ...prev,
      account_type: type
    }))
  }

  const handleRoutingChats = (type: TChatRoomType) => {
    router.push(routes.chats.viewChatsOfType(type))
  }

  console.log({ chats })

  useEffect(() => {
    refetchCustomerSupport()
  }, [stateMemo])

  return (
    <div className='flex flex-col h-full'>
      <div className='border-gray-200'>
        <form className='relative' onSubmit={submitSearch}>
          <Search className='absolute left-2.5 top-2.5 h-4 w-4 text-gray-400' />
          <Input value={search} onChange={(e) => setSearch(e.target.value)} type='search' placeholder={t("searchPlaceholder")} className='pl-8 bg-gray-50' />
        </form>

        <div className='flex flex-col mt-4 space-x-2 mb-4'>
          <Tabs defaultValue={type} className='flex-1 flex flex-col'>
            <TabsList className='grid rounded-none grid-cols-2 p-0 h-auto bg-transparent border-b border-gray-200 w-full'>
              <TabsTrigger value='customer_support' className='data-[state=active]:border-b-2 data-[state=active]:border-b-blue-500 data-[state=active]:shadow-none rounded-none py-2' onClick={() => handleRoutingChats("customer_support")}>
                {t("customerServicesTab")}
              </TabsTrigger>
              <TabsTrigger value='ride_group' className='data-[state=active]:border-b-2 data-[state=active]:border-b-blue-500 data-[state=active]:shadow-none rounded-none py-2' onClick={() => handleRoutingChats("ride_group")}>
                {t("rideGroups")}
              </TabsTrigger>
            </TabsList>

            <TabsContent value='customer_support'>
              <Tabs defaultValue='all' className='flex-1 flex flex-col'>
                <TabsList className='grid rounded-none grid-cols-4 p-0 h-auto bg-transparent border-b border-gray-200 w-full'>
                  <TabsTrigger onClick={() => handleTypeChange("all")} value='all' className='data-[state=active]:border-b-2 data-[state=active]:border-b-blue-500 data-[state=active]:shadow-none rounded-none py-2'>
                    {t("allTab")}
                  </TabsTrigger>
                  <TabsTrigger onClick={() => handleTypeChange("parent")} value='parent' className='data-[state=active]:border-b-2 data-[state=active]:border-b-blue-500 data-[state=active]:shadow-none rounded-none py-2'>
                    {t("parentsTab")}
                  </TabsTrigger>
                </TabsList>

                <TabsContent value='all' className='flex-1 overflow-y-auto mt-0 p-0'>
                  <ChatBubbles type='customer_support' isError={isChatsHasError} error={chatsError} isLoading={isChatsLoading} isRefetching={false} chats={chats?.data} />
                </TabsContent>
                <TabsContent value='parent' className='flex-1 overflow-y-auto mt-0 p-0'>
                  <ChatBubbles type='customer_support' isError={isChatsHasError} error={chatsError} isLoading={isChatsLoading} isRefetching={false} chats={chats?.data} />
                </TabsContent>
              </Tabs>
            </TabsContent>

            <TabsContent value='ride_group'>
              <Tabs defaultValue={"all"} className='flex-1 flex flex-col'>
                <TabsList className='grid rounded-none grid-cols-4 p-0 h-auto bg-transparent border-b border-gray-200 w-full'>
                  <TabsTrigger onClick={() => handleTypeChange("all")} value='all' className='data-[state=active]:border-b-2 data-[state=active]:border-b-blue-500 data-[state=active]:shadow-none rounded-none py-2'>
                    {t("allTab")}
                  </TabsTrigger>
                  <TabsTrigger onClick={() => handleTypeChange("parent")} value='parent' className='data-[state=active]:border-b-2 data-[state=active]:border-b-blue-500 data-[state=active]:shadow-none rounded-none py-2'>
                    {t("parentsTab")}
                  </TabsTrigger>
                </TabsList>

                <TabsContent value='all' className='flex-1 overflow-y-auto mt-0 p-0'>
                  <ChatBubbles type='ride_group' isError={isChatsHasError} error={chatsError} isLoading={isChatsLoading} isRefetching={false} chats={chats?.data} />
                </TabsContent>
                <TabsContent value='parent' className='flex-1 overflow-y-auto mt-0 p-0'>
                  <ChatBubbles type='ride_group' isError={isChatsHasError} error={chatsError} isLoading={isChatsLoading} isRefetching={false} chats={chats?.data} />
                </TabsContent>
              </Tabs>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
