import { getCookie } from "cookies-next"
import { io, Socket } from "socket.io-client"
import { AUTH_COOKIE } from "./constants"

let socket: Socket | null = null

export const getSocket = (): Socket => {
  const token = getCookie(AUTH_COOKIE)
  console.log(token)
  if (!socket) {
    socket = io(process.env.NEXT_PUBLIC_SERVER_URL, {
      transports: ["websocket"],
      autoConnect: true,
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 2000,
      auth: {
        token: token
      },
      extraHeaders: {
        Authroization: token?.toString()!
      }
    })
  }

  return socket
}
