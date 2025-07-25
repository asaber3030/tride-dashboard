import { ChatsInterface } from "../_components/chats-interface"

import { hasAccessTo } from "@/actions/roles"
import { notFound } from "next/navigation"

type Props = {
  searchParams: TSearchParams
  params: Promise<{
    type: TChatRoomType
  }>
}

export default async function AllChatsPage({ searchParams, params }: Props) {
  const { type } = await params

  const hasAccess = await hasAccessTo("Chats")
  const sp = await searchParams

  if (!hasAccess) return notFound()

  return <ChatsInterface type={type} sp={sp} />
}
