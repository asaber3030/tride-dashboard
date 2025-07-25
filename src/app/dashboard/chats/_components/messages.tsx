"use client"

import { useState, useRef, useEffect, useCallback, Fragment } from "react"
import { useChatRoomDetails, useChatMessages } from "../_helpers/hooks"
import { useSocketContext } from "@/providers/ws.provider"
import { useMutation } from "@tanstack/react-query"
import { useUser } from "@/hooks/auth/use-user"

import { sendMediaMessageToChatAction, sendTextMessageToChatAction } from "../_helpers/actions"

import { DefaultLoading } from "@/components/common/loader"
import { ChatMessage } from "@/types/models"
import { DisplayError } from "@/components/common/error"
import { ChatHeader } from "./chat-header"
import { SendMessages } from "./send-messages"
import { MessageContent } from "./message-content"
import { toast } from "react-toastify"

interface ChatMessagesProps {
  chatRoomId: string
  type: TChatRoomType
}

export function ChatMessages({ chatRoomId, type }: ChatMessagesProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const { user } = useUser()

  const { socket } = useSocketContext()

  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [message, setMessage] = useState("")
  const [mainMessages, setMainMessages] = useState<ChatMessage[]>([])

  const { data: chatRoom, isLoading: isChatRoomLoading, isError: isChatRoomHasError, error: chatRoomError } = useChatRoomDetails(chatRoomId)
  const { data: messages, isLoading: isMessagesLoading, isError: isMessagesHasError, error: messagesError } = useChatMessages(chatRoomId, type)

  const specificParticipant = useCallback((id: number) => chatRoom?.participants?.find((p) => p.user_id === id), [chatRoom])

  console.log(selectedFile)

  const scrollToBottom = useCallback(() => {
    requestAnimationFrame(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    })
  }, [])

  const sendMessageMutation = useMutation({
    mutationFn: (msg: string) => sendTextMessageToChatAction(chatRoomId, msg),
    onSuccess: () => {
      setMessage("")
    },
    onError: () => {
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
    if (message.trim()) {
      sendMessageMutation.mutate(message)
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
    if (messages?.data) {
      const sorted = [...messages.data].sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime())
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
    }

    socket.on("new_message", onNewMessage)

    return () => {
      socket.off("new_message", onNewMessage)
    }
  }, [socket, chatRoomId])

  useEffect(() => {
    scrollToBottom()
  }, [mainMessages, scrollToBottom])
  return (
    <div className='flex flex-col h-full'>
      {/* ✅ Chat Header */}
      <ChatHeader participants={chatRoom?.participants} isLoading={isChatRoomLoading} isError={isChatRoomHasError} error={chatRoomError} />

      {/* ✅ Main message area */}
      {isMessagesHasError ? (
        <DisplayError error={messagesError} />
      ) : (
        <div className='flex-1 overflow-y-auto flex flex-col p-4 space-y-4' ref={scrollContainerRef}>
          {isMessagesLoading ? (
            <div className='h-full flex flex-col items-center justify-center'>
              <DefaultLoading variant='pinwheel' />
            </div>
          ) : (
            <Fragment>
              {mainMessages.map((msg) => {
                const sender = specificParticipant(msg.sender_id)?.name || `${user?.first_name} ${user?.last_name}`
                return <MessageContent message={msg} sender={sender} key={msg._id} />
              })}
              <div ref={messagesEndRef} />
            </Fragment>
          )}
        </div>
      )}

      {/* ✅ Send message box */}
      {type !== "ride_group" && <SendMessages file={selectedFile} setFile={setSelectedFile} message={message} setMessage={setMessage} handleSendMessage={onSendMessage} handleKeyPress={onEnterKeyPress} />}
      {/* {selectedFile && <div>{selectedFile.name}</div>} */}
    </div>
  )
}
