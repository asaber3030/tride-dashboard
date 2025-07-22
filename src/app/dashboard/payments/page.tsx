import { PageHeader } from "@/components/dashboard/page-header"
import { PaymentsTable } from "./_components/table"
import { getTranslations } from "next-intl/server"

type Props = {
  searchParams: TSearchParams
}

export default async function PaymentsPage({ searchParams }: Props) {
  const t = await getTranslations()
  const sp = await searchParams

  return (
    <div className='p-6'>
      <PageHeader title={t("payments")} description={t("paymentsDescription")} />
      <PaymentsTable sp={sp} />
    </div>
  )
}
