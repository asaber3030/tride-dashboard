import { DashboardSidebar } from "@/components/app/sidebar"

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className='grid grid-cols-7 min-h-screen'>
      <div className='hidden md:block col-span-2 lg:col-span-1 sticky top-0 h-screen border-r border-gray-200 bg-white'>
        <DashboardSidebar />
      </div>

      {/* Main Content */}
      <div className='col-span-7 md:col-span-5 lg:col-span-6 p-4'>{children}</div>
    </div>
  )
}
