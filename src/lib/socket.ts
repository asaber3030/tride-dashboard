// lib/socket.ts

import { getCookie } from "cookies-next"
import { io, Socket } from "socket.io-client"
import { AUTH_COOKIE } from "./constants"

let socket: Socket | null = null

export const initializeSocket = (): Socket => {
  if (socket) {
    socket.disconnect()
  }

  const token = getCookie(AUTH_COOKIE)

  socket = io(process.env.NEXT_PUBLIC_SERVER_URL!, {
    transports: ["websocket"],
    autoConnect: true,
    reconnection: true,
    reconnectionAttempts: 5,
    reconnectionDelay: 2000,
    auth: { token: token },
    extraHeaders: { Authorization: `Bearer ${token}` }
  })

  return socket
}

export const getInitializedSocket = (): Socket | null => {
  return socket
}

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect()
    socket = null
  }
}
