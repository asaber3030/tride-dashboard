import { getTranslations } from "next-intl/server"

import { ParentsTable } from "./_components/table"
import { PageHeader } from "@/components/dashboard/page-header"
import { Metadata } from "next"

type Props = {
  searchParams: TSearchParams
}

export const metadata: Metadata = {
  title: "Parents"
}

export default async function ParentsPage({ searchParams }: Props) {
  const t = await getTranslations()
  const sp = await searchParams

  return (
    <div>
      <PageHeader title={t("parents")} description={t("parentsDescription")} />
      <ParentsTable sp={sp} />
    </div>
  )
}
