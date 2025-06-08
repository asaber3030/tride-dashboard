"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Smile, Paperclip, Send, ArrowLeft, User } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useIsMobile } from "@/hooks/use-mobile"
import { IMAGES } from "@/lib/constants"
import { useLocale } from "next-intl"

interface ChatMessagesProps {
  onViewChange: (view: "chat" | "info" | "sidebar") => void
}

interface Message {
  id: number
  sender: {
    id: number
    name: string
    role: "driver" | "parent"
    avatar: string
  }
  content: string
  time: string
  timestamp: string
}

export function ChatMessages({ onViewChange }: ChatMessagesProps) {
  const isMobile = useIsMobile()
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const locale = useLocale()

  const [message, setMessage] = useState("")

  const conversation: Message[] = [
    {
      id: 1,
      sender: {
        id: 1,
        name: "Amr Ali Hassan",
        role: "driver",
        avatar: IMAGES.user
      },
      content: "Hey, I'm having a problem with the car — it won't start. I'm currently near the pickup point but can't move.",
      time: "8:00 am",
      timestamp: "8:00 am"
    },
    {
      id: 2,
      sender: {
        id: 2,
        name: "Omar Essam Gamal",
        role: "parent",
        avatar: IMAGES.user
      },
      content: "Thanks for letting us know, Ahmed. Are there children in the car now?",
      time: "8:00 am",
      timestamp: "8:00 am"
    },
    {
      id: 3,
      sender: {
        id: 1,
        name: "Amr Ali Hassan",
        role: "driver",
        avatar: IMAGES.user
      },
      content: "Yes, I picked up Nour and Zeina. Heading to the last pickup point now.",
      time: "8:00 am",
      timestamp: "8:00 am"
    },
    {
      id: 4,
      sender: {
        id: 1,
        name: "Amr Ali Hassan",
        role: "driver",
        avatar: IMAGES.user
      },
      content: "Please update the trip status in the system to 'In Progress' so parents can track.",
      time: "8:00 am",
      timestamp: "8:00 am"
    }
  ]

  // Scroll to bottom of messages when conversation updates
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [conversation])

  const handleSendMessage = () => {
    if (message.trim()) {
      // In a real app, you would add the message to the conversation here
      setMessage("")
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <div className='flex flex-col h-full'>
      {/* Chat header */}
      <div className='flex items-center justify-between p-4 border-b border-gray-200'>
        <div className='flex items-center'>
          {isMobile && (
            <Button variant='ghost' size='icon' className='mr-2' onClick={() => onViewChange("sidebar")}>
              <ArrowLeft className='h-5 w-5' />
            </Button>
          )}
          <Avatar className='h-10 w-10 mr-3'>
            <AvatarImage src={IMAGES.user} alt='Amr Ali Hassan' />
            <AvatarFallback>AH</AvatarFallback>
          </Avatar>
          <div>
            <h2 className='text-sm font-medium'>Amr Ali Hassan</h2>
            <div className='flex items-center'>
              <span className='text-xs px-1.5 py-0.5 rounded bg-orange-100 text-orange-800'>Driver</span>
            </div>
          </div>
        </div>
        {isMobile && (
          <Button variant='ghost' size='icon' onClick={() => onViewChange("info")}>
            <User className='h-5 w-5' />
          </Button>
        )}
      </div>

      {/* Messages */}
      <div className='flex-1 overflow-y-auto p-4 space-y-4'>
        {conversation.map((msg) => (
          <div key={msg.id} className='flex items-start mb-4'>
            <Avatar className='h-8 w-8 mr-3 mt-1'>
              <AvatarImage src={msg.sender.avatar || "/placeholder.svg"} alt={msg.sender.name} />
              <AvatarFallback>{msg.sender.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className='flex-1'>
              <div className='flex items-center mb-1'>
                <span className='text-sm font-medium mr-2'>{msg.sender.name}</span>
                <span className={`text-xs px-1.5 py-0.5 rounded mr-2 ${msg.sender.role === "driver" ? "bg-orange-100 text-orange-800" : "bg-blue-100 text-blue-800"}`}>{msg.sender.role === "driver" ? "Driver" : "Parent"}</span>
                <span className='text-xs text-gray-500'>{msg.time}</span>
              </div>
              <div className='bg-gray-100 rounded-lg p-3 inline-block max-w-[85%]'>
                <p className='text-sm'>{msg.content}</p>
              </div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Message input */}
      <div className='p-4 border-t border-gray-200'>
        <div className='flex items-center bg-gray-100 rounded-full px-4 py-1'>
          <Input type='text' placeholder='Write your message' className='flex-1 border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0' value={message} onChange={(e) => setMessage(e.target.value)} onKeyDown={handleKeyPress} />
          <div className='flex items-center space-x-1'>
            <Button variant='ghost' size='icon' className='text-gray-500 hover:text-gray-700'>
              <Smile className='h-5 w-5' />
            </Button>
            <Button variant='ghost' size='icon' className='text-gray-500 hover:text-gray-700'>
              <Paperclip className='h-5 w-5' />
            </Button>
            <Button size='icon' className='bg-orange-500 hover:bg-orange-600 text-white rounded-full h-8 w-8' onClick={handleSendMessage}>
              <Send className='h-4 w-4' />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
