"use client"

import { useChatRoomDetails } from "../_helpers/hooks"
import { useTranslations } from "next-intl"

import { capitalize, diffForHumans } from "@/lib/utils"

import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"

export function ChatInfo({ chatRoomId }: { chatRoomId: string }) {
  const t = useTranslations()

  const { data, isLoading, isRefetching, isError, error } = useChatRoomDetails(chatRoomId)

  if (isLoading || isRefetching) return <ChatInfoLoader />
  if (isError) return error?.message ? error?.message : "Error loading chat info"

  if (!data) return null

  return (
    <div className={`w-[340px] border-l border-gray-200 hidden xl:block`}>
      <div className='p-4'>
        <h2 className='text-lg font-semibold'>{t("chatInfo")}</h2>
        <p className='text-gray-600'>{t("chatInfoDescription")}</p>
        <Separator className='mb-4' />

        <div className='space-y-4'>
          <div className=''>
            <h3 className='text-sm font-medium'>{t("id")}</h3>
            <p className='text-gray-700'>{data._id}</p>
          </div>
          <div className=''>
            <h3 className='text-sm font-medium'>{t("chatRoomName")}</h3>
            <p className='text-gray-700'>{data.name}</p>
          </div>
          {data.last_message && (
            <>
              <div className=''>
                <h3 className='text-sm font-medium'>{t("lastSentMessage")}</h3>
                <p className='text-gray-700'>{diffForHumans(data.last_message?.created_at)}</p>
              </div>
              {data.last_message?.sender_name && (
                <div className=''>
                  <h3 className='text-sm font-medium'>{t("lastSentMessageBy")}</h3>
                  <p className='text-gray-700'>{data.last_message?.sender_name}</p>
                </div>
              )}
            </>
          )}
          <div className=''>
            <h3 className='text-sm font-medium'>{t("active")}</h3>
            <p className='text-gray-700'>
              <Badge variant={data.is_active ? "success" : "destructive"}>{t(data.is_active ? "yes" : "no")}</Badge>
            </p>
          </div>
          <div className=''>
            <h3 className='text-sm font-medium'>{t("participants")}</h3>
            <div className='flex gap-2'>
              {data.participants.map((participant, index) => (
                <>
                  {participant?.name && (
                    <p key={`participant-${index}`} className='text-gray-700 text-sm px-2 border p-1 rounded-md'>
                      {participant.name}
                    </p>
                  )}
                </>
              ))}
            </div>
          </div>

          <div className=''>
            <h3 className='text-sm font-medium'>{t("roomType")}</h3>
            <p className='text-gray-700'>{capitalize(data.room_type)}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

const ChatInfoLoader = () => {
  return (
    <div className='w-[340px] border-l border-gray-200 hidden xl:block'>
      <div className='p-4'>
        <h2 className='text-lg font-semibold'>Loading...</h2>
        <p className='text-gray-600'>Please wait while we fetch chat information.</p>
      </div>
    </div>
  )
}
