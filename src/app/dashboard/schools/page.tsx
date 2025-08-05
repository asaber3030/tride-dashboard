import { PageHeader } from "@/components/dashboard/page-header"
import { SchoolsTable } from "./_components/table"

import { getTranslations } from "next-intl/server"
import { notFound } from "next/navigation"
import { hasAccessTo } from "@/actions/roles"

type Props = {
  searchParams: TSearchParams
}

export default async function SchoolPage({ searchParams }: Props) {
  const t = await getTranslations()
  const sp = await searchParams

  const hasAccess = await hasAccessTo("Schools")
  if (!hasAccess) return notFound()

  return (
    <div className='p-6'>
      <PageHeader title={t("schools")} description={t("schoolsDescription")} />
      <SchoolsTable sp={sp} />
    </div>
  )
}
