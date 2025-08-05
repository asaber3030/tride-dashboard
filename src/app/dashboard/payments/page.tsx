import { PageHeader } from "@/components/dashboard/page-header"
import { PaymentsTable } from "./_components/table"
import { getTranslations } from "next-intl/server"
import { hasAccessTo } from "@/actions/roles"
import { notFound } from "next/navigation"

type Props = {
  searchParams: TSearchParams
}

export default async function PaymentsPage({ searchParams }: Props) {
  const t = await getTranslations()
  const sp = await searchParams

  const hasAccess = await hasAccessTo("Payments")
  if (!hasAccess) return notFound()

  return (
    <div className='p-6'>
      <PageHeader title={t("payments")} description={t("paymentsDescription")} />
      <div className='overflow-x-auto'>
        <PaymentsTable sp={sp} />
      </div>
    </div>
  )
}
