import { PageHeader } from "@/components/dashboard/page-header"
import { PaymentsTable } from "./_components/table"
import { Metadata } from "next"

import { PaymentsHeader } from "./_components/header"
import { getTranslations } from "next-intl/server"

export const metadata: Metadata = {
  title: "Parents Payments | Dashboard",
  description: "Manage available Parents Payments and control actions & filter."
}

export default async function PaymentsPage() {
  const t = await getTranslations()

  return (
    <div className='p-6'>
      <PageHeader className='mb-2' title={t("parentsPayments")} description={t("parentsPaymentsDescription")} />
      <PaymentsHeader />
      <PaymentsTable />
    </div>
  )
}
