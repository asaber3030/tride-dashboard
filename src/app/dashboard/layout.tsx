import { getUserDetails } from "@/actions/app"
import { getUser } from "@/actions/auth"
import { DashboardSidebar } from "@/components/app/sidebar"
import { getLocale } from "next-intl/server"
import { redirect } from "next/navigation"

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const locale = await getLocale()
  const isArabic = locale === "ar"

  const user = await getUser()
  if (!user) return redirect("/login")

  return (
    <div className='min-h-screen bg-gray-50'>
      <div className={`hidden xl:block fixed inset-y-0 ${isArabic ? "right-0" : "left-0"} w-64 z-30 border-r border-gray-200 bg-white`}>
        <DashboardSidebar />
      </div>
      <div className={`${isArabic ? "sm:mr-[256px]" : "sm:ml-[256px]"} p-4`}>{children}</div>
    </div>
  )
}
