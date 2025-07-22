import { getTranslations } from "next-intl/server"

import { PageHeader } from "@/components/dashboard/page-header"
import { GovernoratesTable } from "./_components/table"
import { Metadata } from "next"

type Props = {
  searchParams: TSearchParams
}

export const metadata: Metadata = {
  title: "Governorates"
}

export default async function CitiesPage({ searchParams }: Props) {
  const t = await getTranslations()
  const sp = await searchParams

  return (
    <div className='p-6'>
      <PageHeader title={t("governorates")} description={t("governoratesDescription")} />
      <GovernoratesTable sp={sp} />
    </div>
  )
}
