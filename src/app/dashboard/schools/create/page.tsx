import { PageHeader } from "@/components/dashboard/page-header"
import { CreateSchoolForm } from "../_components/create"

import { getTranslations } from "next-intl/server"
import { notFound } from "next/navigation"
import { hasAccessTo } from "@/actions/roles"

export default async function CreateSchoolPage() {
  const t = await getTranslations()

  const hasAccess = await hasAccessTo("Schools")
  if (!hasAccess) return notFound()

  return (
    <div>
      <PageHeader title={t("schoolsSchema.createTitle")} description={t("schoolsSchema.createDescription")} />
      <CreateSchoolForm />
    </div>
  )
}
