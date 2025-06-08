import { PageHeader } from "@/components/dashboard/page-header"
import { RequestsTable } from "./_components/table"
import { Metadata } from "next"
import { getTranslations } from "next-intl/server"

export const metadata: Metadata = {
  title: "Requests | Dashboard",
  description: "Manage available Requests and control actions & filter."
}

export default async function RequestsPage() {
  const t = await getTranslations()

  return (
    <div className='p-6'>
      <PageHeader title={t("driversRequests")} description={t("driversRequestsDescription")} />
      <RequestsTable />
    </div>
  )
}
