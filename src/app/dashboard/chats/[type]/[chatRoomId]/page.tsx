import { ChatsInterface } from "../../_components/chats-interface"

import { hasAccessTo } from "@/actions/roles"
import { notFound } from "next/navigation"
import { SingleChatInterface } from "../../_components/chat-interface"

type Props = {
  searchParams: TSearchParams
  params: Promise<{
    type: TChatRoomType
    chatRoomId: string
  }>
}

export default async function SingleChatPage({ searchParams, params }: Props) {
  const hasAccess = await hasAccessTo("Chats")
  const sp = await searchParams

  const { type, chatRoomId } = await params

  if (!hasAccess) return notFound()

  return <SingleChatInterface type={type} sp={sp} chatRoomId={chatRoomId} />
}
