"use server"

import { getToken } from "@/actions/auth"
import { API_URL } from "@/lib/constants"
import { api } from "@/services/axios"
import { ChatMessage, ChatRoom } from "@/types/models"
import axios from "axios"
import { build } from "search-params"

type GetChatData = {
  pagination: PaginationItems
  data: ChatRoom[]
}

type GetChatMessagesData = {
  pagination: PaginationItems
  data: ChatMessage[]
}

// Fetch All Chats For [Ride Groups, Customer Support]
export async function getRideGroupsChats(sp: TObject = {}) {
  try {
    const query = build(sp)
    const url = `/admin-view/chats/ride-groups/?${query}`
    const request = await api<any>("GET", url)
    return request.data
  } catch (error) {
    const err = error as ApiResponse<any>
    throw new Error(err?.data?.data?.message || "Failed to fetch ride groups chats")
  }
}

export async function getCustomerSupportChats(sp: TObject = {}) {
  try {
    const query = build(sp)
    const url = `/admin-view/chats/customer-support/rooms?${query}`
    const request = await api<GetChatData>("GET", url)
    return request.data
  } catch (error) {
    const err = error as ApiResponse<any>
    throw new Error(err?.data?.data?.message || "Failed to fetch customer support chats")
  }
}

// Get Messages For [Ride Groups, Customer Support]
export async function getRideGroupChatMessages(rideGroupId: string, sp: TObject = {}): Promise<GetChatMessagesData> {
  try {
    const query = build(sp)
    const url = `/admin-view/chats/ride-groups/${rideGroupId}/messages?${query}`
    const request = await api<any>("GET", url)
    return request.data
  } catch (error) {
    const err = error as ApiResponse<any>
    throw new Error(err?.data?.data?.message || "Failed to fetch chat room for ride group")
  }
}

export async function getCustomerSupportChatMessages(id: string, sp: TObject = {}): Promise<GetChatMessagesData> {
  try {
    const query = build(sp)
    const url = `/admin-view/chats/customer-support/rooms/${id}/messages?${query}`
    const request = await api<GetChatMessagesData>("GET", url)
    return request.data
  } catch (error) {
    const err = error as ApiResponse<any>
    throw new Error(err?.data?.data?.message || "Failed to fetch customer support messages")
  }
}

export async function getChatRoomDetails(chatId: string): Promise<ChatRoom> {
  try {
    const url = `/admin-view/chats/details/${chatId}`
    const request = await api<ChatRoom>("GET", url)
    return request.data
  } catch (error) {
    const err = error as ApiResponse<any>
    throw new Error(err?.data?.data?.message || "Failed to fetch chat room details")
  }
}

export async function sendTextMessageToChatAction(id: string, message: string) {
  try {
    const url = `/messages/${id}/message`
    const request = await api<ChatMessage>("POST", url, { type: "text", message })
    return request.data
  } catch (error) {
    const err = error as ApiResponse<any>
    throw new Error(err?.data?.data?.message || "Failed to send message to chat")
  }
}

export async function sendMediaMessageToChatAction(id: string, media: FormData) {
  try {
    const url = `${API_URL}/messages/${id}/media`
    const token = await getToken()
    const request = await axios.post(url, media, {
      headers: {
        "Content-Type": "multipart/form-data",
        Accept: "application/json",
        Authorization: `Bearer ${token}`
      }
    })
    return request.data
  } catch (error) {
    const err = error as ApiResponse<any>
    console.error("Error sending media message:", err)
    throw new Error(err?.data?.message || err?.message || "Failed to send media message to chat")
  }
}
