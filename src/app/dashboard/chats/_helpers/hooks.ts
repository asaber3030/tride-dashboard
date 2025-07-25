import qk from "@/lib/query-keys"

import { getChatRoomDetails, getCustomerSupportChats, getCustomerSupportChatMessages, getRideGroupsChats, getRideGroupChatMessages } from "./actions"
import { useQuery } from "@tanstack/react-query"

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
    queryFn: ({ queryKey }) => fn(queryKey[3] as TObject)
  })
}

export function useChatMessages(id: string | number, type: TChatRoomType = "customer_support") {
  switch (type) {
    case "ride_group":
      return useQuery({
        queryKey: qk.chats.chatMessages(id.toString(), {}, type),
        queryFn: ({ queryKey }) => getRideGroupChatMessages(queryKey[2] as string, queryKey[4] as TObject)
      })
    case "customer_support":
      return useQuery({
        queryKey: qk.chats.chatMessages(id.toString(), {}, type),
        queryFn: ({ queryKey }) => getCustomerSupportChatMessages(queryKey[2] as string, queryKey[4] as TObject)
      })

    default:
      throw new Error("Invalid chat room type")
  }
}
