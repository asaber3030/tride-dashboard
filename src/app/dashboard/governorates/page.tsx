import { getTranslations } from "next-intl/server"

import { PageHeader } from "@/components/dashboard/page-header"
import { GovernoratesTable } from "./_components/table"
import { Metadata } from "next"
import { getUser } from "@/actions/auth"
import { notFound } from "next/navigation"

type Props = {
  searchParams: TSearchParams
}

export const metadata: Metadata = {
  title: "Governorates"
}

export default async function CitiesPage({ searchParams }: Props) {
  const t = await getTranslations()
  const sp = await searchParams

  const user = await getUser()
  if (!user || user.role?.role_name != "super admin") return notFound()

  return (
    <div>
      <PageHeader title={t("governorates")} description={t("governoratesDescription")} />
      <GovernoratesTable sp={sp} />
    </div>
  )
}
