"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { IMAGES } from "@/lib/constants"
import { cn, diffForHumans } from "@/lib/utils"
import { ChatMessage } from "@/types/models"
import { FileIcon } from "lucide-react"
import { useTranslations } from "next-intl"

type Props = {
  message: ChatMessage
  sender: string
}

export const MessageContent = ({ sender, message }: Props) => {
  const t = useTranslations()
  let content: React.ReactNode

  switch (message.type) {
    case "text":
      content = <p className='text-sm'>{message.message || "No message content"}</p>
      break

    case "image":
      content = <img src={message.message} alt='Message Image' className='max-w-full rounded-lg' />
      break

    case "video":
      content = (
        <video controls className='max-w-full rounded-lg'>
          <source src={message.message} type='video/mp4' />
          Your browser does not support the video tag.
        </video>
      )
      break

    case "audio":
      content = (
        <audio controls className='w-full'>
          <source src={message.message} type='audio/mpeg' />
          Your browser does not support the audio element.
        </audio>
      )
      break

    case "document":
      content = (
        <a href={message.media_url!} target='_blank' className='w-full text-blue-500 hover:underline flex gap-2 items-center'>
          <FileIcon /> Download document
        </a>
      )
      break

    default:
      content = <p className='text-sm text-gray-500'>Unsupported message type</p>
      break
  }

  return (
    <div key={message._id} className='flex items-start'>
      {/* ✅ Avatar */}
      <Avatar className='h-8 w-8 mx-3 mt-1'>
        <AvatarImage src={IMAGES.user} alt='USER' />
        <AvatarFallback>{sender?.charAt(0).toUpperCase()}</AvatarFallback>
      </Avatar>

      {/* ✅ Message bubble */}
      <div className='flex-1'>
        {/* ✅ Sender info */}
        <div className='flex items-center gap-2 mb-1'>
          <span className='text-sm font-medium mr-2'>{sender}</span>
          <span className={cn("text-xs px-1.5 py-0.5 rounded mx-2 capitalize", message.sender_type === "parent" ? "bg-orange-100 text-orange-800" : "bg-blue-100 text-blue-800")}>{t(message.sender_type)}</span>
          <span className='text-xs text-gray-500'>
            <bdi>{diffForHumans(message.created_at)}</bdi>
          </span>
        </div>

        {/* ✅ Dynamic content (text, image, video, audio) */}
        <div className='bg-gray-100 rounded-lg p-3 inline-block max-w-[85%]'>{content}</div>
      </div>
    </div>
  )
}
