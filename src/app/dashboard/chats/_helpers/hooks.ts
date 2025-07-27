import qk from "@/lib/query-keys"

import { getChatRoomDetails, getCustomerSupportChats, getCustomerSupportChatMessages, getRideGroupsChats, getRideGroupChatMessages, GetChatMessagesData } from "./actions"
import { useInfiniteQuery, useQuery } from "@tanstack/react-query"
import { useState } from "react"

export function useChatRoomDetails(id: string) {
  return useQuery({
    queryKey: qk.chats.singleChat(id),
    queryFn: ({ queryKey }) => getChatRoomDetails(queryKey[2] as string)
  })
}

export function useChats(sp: TObject = {}, type: TChatRoomType = "customer_support") {
  const fn = type === "ride_group" ? getRideGroupsChats : getCustomerSupportChats
  return useQuery({
    queryKey: qk.chats.all(sp),
    queryFn: ({ queryKey }) => fn(queryKey[3] as TObject),
    retry: false
  })
}

export function useChatMessages(id: string | number, type: TChatRoomType = "customer_support") {
  const [page, setPage] = useState(1)

  const fetchMessages = async ({ pageParam = 1 }): Promise<GetChatMessagesData> => {
    const sp = { page: pageParam }
    if (type === "ride_group") {
      return await getRideGroupChatMessages(id.toString(), sp)
    }
    return await getCustomerSupportChatMessages(id.toString(), sp)
  }

  const query = useInfiniteQuery({
    queryKey: qk.chats.chatMessages(id.toString(), {}, type),
    queryFn: fetchMessages,
    getNextPageParam: (lastPage) => (lastPage.pagination.nextPage !== null && lastPage.pagination.nextPage !== undefined ? lastPage.pagination.nextPage : undefined),
    initialPageParam: 1
  })

  return {
    ...query,
    page,
    setPage
  }
}
