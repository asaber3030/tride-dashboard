"use client"

import { useState, useRef, useEffect, useCallback, Fragment, use } from "react"
import { useChatRoomDetails } from "../_helpers/hooks"
import { useSocketContext } from "@/providers/ws.provider"
import { useChatMessages } from "../_helpers/hooks"
import { useTranslations } from "next-intl"
import { useMutation } from "@tanstack/react-query"
import { useUser } from "@/hooks/auth/use-user"

import { sendMediaMessageToChatAction, sendTextMessageToChatAction } from "../_helpers/actions"
import { toast } from "react-toastify"

import { DisplayError } from "@/components/common/error"
import { MessagesList } from "./messages-list"
import { SendMessages } from "./send-messages"
import { ChatMessage } from "@/types/models"
import { ChatHeader } from "./chat-header"

interface ChatMessagesProps {
  chatRoomId: string
  type: TChatRoomType
}

export function ChatMessages({ chatRoomId, type }: ChatMessagesProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const messagesStartRef = useRef<HTMLDivElement>(null)
  const initialScrolledRef = useRef(false)
  const messageRef = useRef<HTMLInputElement>(null)

  const { socket } = useSocketContext()

  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [mainMessages, setMainMessages] = useState<ChatMessage[]>([])

  const { data: chatRoom, isLoading: isChatRoomLoading, isError: isChatRoomHasError, error: chatRoomError } = useChatRoomDetails(chatRoomId)
  const { data: messages, isLoading: isMessagesLoading, isError: isMessagesHasError, error: messagesError, fetchNextPage, isFetchingNextPage, hasNextPage, page, setPage } = useChatMessages(chatRoomId, type)

  const specificParticipant = useCallback((id: number) => chatRoom?.participants?.find((p) => p.user_id === id), [chatRoom])
  const scrollToBottom = useCallback(() => {
    requestAnimationFrame(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    })
  }, [])

  const sendMessageMutation = useMutation({
    mutationFn: (msg: string) => sendTextMessageToChatAction(chatRoomId, msg),
    onSuccess: () => {
      if (messageRef?.current) messageRef.current.value = ""
    },
    onError: (error) => {
      toast.error(error?.message || "Failed to send message")
      console.error("Failed to send message")
    }
  })

  const sendMediaMessageMutation = useMutation({
    mutationFn: (mediaUrl: FormData) => sendMediaMessageToChatAction(chatRoomId, mediaUrl),
    onSuccess: () => {},
    onError: (error) => {
      toast.error(error?.message)
    }
  })

  const onSendMessage = () => {
    if (messageRef?.current?.value.trim()) {
      sendMessageMutation.mutate(messageRef?.current?.value)
    }
    if (selectedFile) {
      const formData = new FormData()
      formData.append("file", selectedFile)
      formData.append("type", "image")
      sendMediaMessageMutation.mutate(formData)
    }
  }

  const onEnterKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      onSendMessage()
    }
  }

  useEffect(() => {
    if (messages?.pages) {
      const allMessages = messages.pages.flatMap((page) => page.data)
      const sorted = [...allMessages].sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime())
      setMainMessages(sorted)
    }
  }, [messages])

  useEffect(() => {
    if (!socket || !chatRoomId) return
    const joinRoom = () => socket.emit("join_room", chatRoomId)
    if (socket.connected) joinRoom()
    else socket.on("connect", joinRoom)
    return () => {
      socket.emit("leave_room", chatRoomId)
      socket.off("connect", joinRoom)
    }
  }, [socket, chatRoomId])

  useEffect(() => {
    if (!socket || !chatRoomId) return
    const onNewMessage = (msg: ChatMessage) => {
      setMainMessages((prev) => [...prev, msg].sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime()))
      scrollToBottom()
    }
    socket.on("new_message", onNewMessage)
    return () => {
      socket.off("new_message", onNewMessage)
    }
  }, [socket, chatRoomId, messageRef.current?.value])

  useEffect(() => {
    if (!isMessagesLoading && messages?.pages && messages.pages.length > 0 && mainMessages.length > 0 && !initialScrolledRef.current) {
      scrollToBottom()
      initialScrolledRef.current = true
    }
  }, [isMessagesLoading, messages, mainMessages, scrollToBottom])

  useEffect(() => {
    const handleScroll = () => {
      if (scrollContainerRef.current && scrollContainerRef.current.scrollTop === 0 && hasNextPage) {
        fetchNextPage()
        setPage((prev) => prev + 1)
      }
    }
    const scrollContainer = scrollContainerRef.current
    scrollContainer?.addEventListener("scroll", handleScroll)
    return () => {
      scrollContainer?.removeEventListener("scroll", handleScroll)
    }
  }, [fetchNextPage, hasNextPage, setPage])

  return (
    <div className='flex flex-col h-full'>
      <ChatHeader participants={chatRoom?.participants} isLoading={isChatRoomLoading} isError={isChatRoomHasError} error={chatRoomError} />

      {isMessagesHasError ? (
        <DisplayError error={messagesError} />
      ) : (
        <MessagesList
          isMessagesLoading={isMessagesLoading}
          messagesStartRef={messagesStartRef}
          messagesEndRef={messagesEndRef}
          scrollContainerRef={scrollContainerRef}
          mainMessages={mainMessages}
          hasNextPage={hasNextPage}
          isFetchingNextPage={isFetchingNextPage}
          fetchNextPage={fetchNextPage}
          setPage={setPage}
          specificParticipant={specificParticipant}
        />
      )}
      {type !== "ride_group" && <SendMessages file={selectedFile} setFile={setSelectedFile} messageRef={messageRef} handleSendMessage={onSendMessage} handleKeyPress={onEnterKeyPress} />}
    </div>
  )
}
