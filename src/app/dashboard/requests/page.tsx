import { PageHeader } from "@/components/dashboard/page-header"
import { RequestsTable } from "./_components/table"
import { Metadata } from "next"
import { getTranslations } from "next-intl/server"
import { hasAccessTo } from "@/actions/roles"
import { notFound } from "next/navigation"

export const metadata: Metadata = {
  title: "Requests | Dashboard",
  description: "Manage available Requests and control actions & filter."
}

export default async function RequestsPage() {
  const t = await getTranslations()

  const hasAccess = await hasAccessTo("Requests")
  if (!hasAccess) return notFound()

  return (
    <div className='p-6'>
      <PageHeader title={t("driversRequests")} description={t("driversRequestsDescription")} />
      <RequestsTable />
    </div>
  )
}
