import { PageHeader } from "@/components/dashboard/page-header"
import { CitiesTable } from "./_components/table"
import { getTranslations } from "next-intl/server"
import { getUser } from "@/actions/auth"
import { notFound } from "next/navigation"

type Props = {
  searchParams: TSearchParams
}

export default async function CitiesPage({ searchParams }: Props) {
  const t = await getTranslations()
  const sp = await searchParams

  const user = await getUser()
  if (!user || user.role?.role_name != "super admin") return notFound()

  return (
    <div className='p-6'>
      <PageHeader title={t("cities")} description={t("citiesDescription")} />
      <CitiesTable sp={sp} />
    </div>
  )
}
