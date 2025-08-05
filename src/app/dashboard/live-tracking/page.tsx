import { hasAccessTo } from "@/actions/roles"
import BusTrackingDashboard from "./_components/live-tracking-interface"

import { Metadata } from "next"
import { notFound } from "next/navigation"

export const metadata: Metadata = {
  title: "Live Tracking",
  description: "Live tracking of vehicles and assets"
}

export default async function Page() {
  const hasAccess = await hasAccessTo("Live Tracking")
  if (!hasAccess) return notFound()

  return (
    <div className='min-h-screen bg-gray-50'>
      <BusTrackingDashboard />
    </div>
  )
}
