"use client"

import routes from "@/lib/routes"

import { useLocale, useTranslations } from "next-intl"
import { useRouter } from "next/navigation"

import { cn, diffForHumans } from "@/lib/utils"

import { IMAGES } from "@/lib/constants"

import { ChatRoom } from "@/types/models"
import { DefaultLoading } from "@/components/common/loader"
import { Fragment } from "react"

type Props = {
  chats: ChatRoom[] | undefined
  isError: boolean
  error: Error | null
  isLoading: boolean
  isRefetching: boolean
  type: TChatRoomType
}

export const ChatBubbles = ({ type, chats, isError, isLoading, isRefetching, error }: Props) => {
  const router = useRouter()
  const locale = useLocale()
  const t = useTranslations()

  if (isError) return error?.message ? <div className='text-red-500 text-center p-4'>{t(error.message)}</div> : null

  return (
    <div>
      {isLoading || isRefetching ? (
        <DefaultLoading variant='ring' />
      ) : (
        <Fragment>
          {chats?.length === 0 ? (
            <div className='text-center p-4 text-yellow-800'>{t("noChatsFound")}</div>
          ) : (
            <Fragment>
              {isError && error ? <div className='text-red-500 text-center p-4'>{t(error.message)}</div> : null}
              {chats?.map((item) => (
                <div onClick={() => router.push(routes.chats.chatMessages(item._id, type))} key={item._id} className={cn("flex items-center p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer", locale === "en" ? "flex-row" : "flex-row-reverse")}>
                  <div className='relative mr-3'>
                    <img src={IMAGES.placeholder} alt={item.name} className='w-10 h-10 rounded-full object-cover' />
                  </div>
                  <div className='flex-1 min-w-0'>
                    <div className={cn("flex justify-between items-center", locale === "en" ? "flex-row" : "flex-row-reverse")}>
                      <h3 className='text-sm font-medium truncate max-w-32'>{item.name}</h3>
                      {item?.last_message && item?.last_message?.created_at && <span className='text-xs text-gray-500'>{diffForHumans(item?.last_message?.created_at)}</span>}
                    </div>
                    <div className={cn("flex items-center", locale === "en" ? "flex-row" : "flex-row-reverse")}>
                      <span className={`text-xs px-1.5 py-0.5 rounded mr-2 ${item?.last_message?.sender_type === "driver" ? "bg-orange-100 text-orange-800" : "bg-blue-100 text-blue-800"}`}>{item?.last_message?.sender_type === "driver" ? t("driverRole") : t("parentRole")}</span>
                      <p className='text-xs text-gray-500 truncate'>{item?.last_message?.message}</p>
                    </div>
                  </div>
                </div>
              ))}
            </Fragment>
          )}
        </Fragment>
      )}
    </div>
  )
}
