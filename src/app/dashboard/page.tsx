import { Car, FileText, CreditCard } from "lucide-react"
import { FilterBar } from "@/components/dashboard/filter-bar"
import { MetricCard } from "@/components/dashboard/metric-card"
import { TripsTable } from "@/components/dashboard/trips-table"
import { ProceduresList } from "@/components/dashboard/procedures-list"
import { StatsCard } from "@/components/dashboard/stats-card"
import { PageHeader } from "@/components/dashboard/page-header"
import { getTranslations } from "next-intl/server"
import { formatToEGP } from "@/lib/utils"

const initialFilters = [
  { id: "today", label: "today" },
  { id: "monthly", label: "monthly" },
  { id: "weekly", label: "weekly" },
  { id: "sunday", label: "sunday" },
  { id: "yearly", label: "yearly" }
]

const trips = [
  {
    id: "1",
    school: "El Zahraa Language School",
    students: 20,
    driver: "Amr Ali Hassan",
    date: "20/05/2023",
    time: "8:00 AM",
    location: "Cairo"
  },
  {
    id: "2",
    school: "El Zahraa Language School",
    students: 20,
    driver: "Amr Ali Hassan",
    date: "20/05/2023",
    time: "9:00 AM",
    location: "Cairo"
  },
  {
    id: "3",
    school: "El Zahraa Language School",
    students: 20,
    driver: "Amr Ali Hassan",
    date: "20/05/2023",
    time: "8:00 AM",
    location: "Cairo"
  },
  {
    id: "4",
    school: "El Zahraa Language School",
    students: 20,
    driver: "Amr Ali Hassan",
    date: "20/05/2023",
    time: "8:00 AM",
    location: "Cairo"
  }
]

const procedures = [
  {
    id: "1",
    user: {
      name: "Amr Ali Hassan",
      initials: "AA"
    },
    message: "I may be delayed by about 10 minutes due to traffic congestion in Nasr city. I'll keep you updated. Thank you for your patience.",
    status: "pending" as const
  },
  {
    id: "2",
    user: {
      name: "Omar Essam Gamal",
      initials: "OE"
    },
    message: "I may be delayed by about 10 minutes due to traffic congestion in Nasr city. I'll keep you updated. Thank you for your patience.",
    status: "approved" as const
  },
  {
    id: "3",
    user: {
      name: "Amr Ali Hassan",
      initials: "AA"
    },
    message: "I may be delayed by about 10 minutes due to traffic congestion in Nasr city. I'll keep you updated. Thank you for your patience.",
    status: "pending" as const
  }
]

export default async function DashboardPage() {
  const t = await getTranslations()

  return (
    <div className='p-6 max-w-[1600px] mx-auto'>
      <PageHeader title={t("dashboard")} description={t("dashboard")} />

      {/* Filters */}
      <div className='mb-6'>
        <FilterBar filters={initialFilters} />
      </div>

      {/* Metrics */}
      <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-6'>
        <MetricCard title={t("todaysTrip")} value='80' icon={<Car className='h-5 w-5 text-blue-600' />} iconColor='bg-blue-100' />
        <MetricCard title={t("pendingRequests")} value='120' icon={<FileText className='h-5 w-5 text-orange-600' />} iconColor='bg-orange-100' />
        <MetricCard title={t("pendingPayments")} value={formatToEGP(10000)} icon={<CreditCard className='h-5 w-5 text-green-600' />} iconColor='bg-green-100' />
      </div>

      {/* Main content */}
      <div className='grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6'>
        <div className='lg:col-span-2'>
          <TripsTable trips={trips} />
        </div>
        <div>MAP VIEW GOES HERE.</div>
      </div>

      {/* Procedures and Stats */}
      <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
        <div className='lg:col-span-2'>
          <ProceduresList procedures={procedures} />
        </div>
        <div className='space-y-6'>
          <StatsCard value='128.7K' percentChange={8.4} />
          <StatsCard value='220,342.76' percentChange={24.4} />
        </div>
      </div>
    </div>
  )
}
