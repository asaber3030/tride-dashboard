import { SocketProvider } from "@/providers/ws.provider"
import React from "react"

export default function ChatsLayout({ children }: { children: React.ReactNode }) {
  return <SocketProvider>{children}</SocketProvider>
}
