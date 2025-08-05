import { SocketProvider } from "@/providers/ws.provider"

export default function ChatsLayout({ children }: { children: React.ReactNode }) {
  return <SocketProvider>{children}</SocketProvider>
}
