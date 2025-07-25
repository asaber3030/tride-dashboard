"use client"

import React, { createContext, useContext, useEffect, useState } from "react"
import { Socket } from "socket.io-client"
import { getSocket } from "@/lib/socket"

type SocketContextType = {
  socket: Socket | null
  isConnected: boolean
}

const SocketContext = createContext<SocketContextType>({
  socket: null,
  isConnected: false
})

export const useSocketContext = () => useContext(SocketContext)

export const SocketProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [socket] = useState(() => getSocket())
  const [isConnected, setIsConnected] = useState(socket.connected)

  useEffect(() => {
    socket.connect()

    const onConnect = () => {
      setIsConnected(true)
      console.log("Socket connected: ", socket.id)
    }
    const onDisconnect = () => {
      setIsConnected(false)
      console.log("Socket disconnected")
    }

    socket.on("connect", onConnect)
    socket.on("disconnect", onDisconnect)

    socket.on("ack", (data) => {
      console.log("Acknowledgment received: ", data)
    })

    console.log({ socket, isConnected })

    return () => {
      socket.off("connect", onConnect)
      socket.off("disconnect", onDisconnect)
    }
  }, [socket])

  return <SocketContext.Provider value={{ socket, isConnected }}>{children}</SocketContext.Provider>
}
