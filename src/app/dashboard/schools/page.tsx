import { PageHeader } from "@/components/dashboard/page-header"
import { SchoolsTable } from "./_components/table"
import { getTranslations } from "next-intl/server"

type Props = {
  searchParams: TSearchParams
}

export default async function ShoolsPage({ searchParams }: Props) {
  const t = await getTranslations()
  const sp = await searchParams

  return (
    <div className='p-6'>
      <PageHeader title={t("schools")} description={t("schoolsDescription")} />
      <SchoolsTable sp={sp} />
    </div>
  )
}
