import BusTrackingDashboard from "./_components/live-tracking-interface"

import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Live Tracking",
  description: "Live tracking of vehicles and assets"
}

export default function Page() {
  return (
    <div className='min-h-screen bg-gray-50'>
      <BusTrackingDashboard />
    </div>
  )
}
