import { getTranslations } from "next-intl/server"
import { notFound } from "next/navigation"
import { getUser } from "@/actions/auth"

import { DriversTable } from "./_components/table"
import { PageHeader } from "@/components/dashboard/page-header"
import { Metadata } from "next"

type Props = {
  searchParams: TSearchParams
}

export const metadata: Metadata = {
  title: "Drivers"
}

export default async function DriversPage({ searchParams }: Props) {
  const t = await getTranslations()
  const sp = await searchParams

  const user = await getUser()
  if (!user || user.role?.role_name != "super admin") return notFound()

  return (
    <div>
      <PageHeader title={t("drivers")} description={t("driversDescription")} />
      <DriversTable sp={sp} />
    </div>
  )
}
