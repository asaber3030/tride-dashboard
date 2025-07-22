import { PageHeader } from "@/components/dashboard/page-header"
import { CitiesTable } from "./_components/table"
import { getTranslations } from "next-intl/server"

type Props = {
  searchParams: TSearchParams
}

export default async function CitiesPage({ searchParams }: Props) {
  const t = await getTranslations()
  const sp = await searchParams

  return (
    <div className='p-6'>
      <PageHeader title={t("cities")} description={t("citiesDescription")} />
      <CitiesTable sp={sp} />
    </div>
  )
}
