import { PageHeader } from "@/components/dashboard/page-header"
import { SchoolsTable } from "./_components/table"
import { getTranslations } from "next-intl/server"

export default async function SchoolsPage() {
  const t = await getTranslations()

  return (
    <div className='p-6'>
      <PageHeader title={t("schools")} description={t("schoolsDescription")} />
      <SchoolsTable />
    </div>
  )
}
