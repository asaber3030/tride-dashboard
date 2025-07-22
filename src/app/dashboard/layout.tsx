import { DashboardSidebar } from "@/components/app/sidebar"

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className='flex xl:flex-row flex-col min-h-screen'>
      <DashboardSidebar />
      <div className='flex-1 p-4 max-w-fit'>{children}</div>
    </div>
  )
}
