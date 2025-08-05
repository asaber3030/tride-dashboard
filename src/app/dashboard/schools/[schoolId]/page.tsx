import { PageHeader } from "@/components/dashboard/page-header"

import { getTranslations } from "next-intl/server"
import { notFound } from "next/navigation"
import { hasAccessTo } from "@/actions/roles"
import { UpdateSchoolForm } from "../_components/update"
import { getSchool } from "../_helpers/actions"

type Props = {
  params: Promise<{
    schoolId: string
  }>
}

export default async function UpdateSchoolPage({ params }: Props) {
  const t = await getTranslations()
  const { schoolId } = await params

  const school = await getSchool(+schoolId)

  const hasAccess = await hasAccessTo("Schools")
  if (!hasAccess) return notFound()
  if (isNaN(+schoolId)) return notFound()
  if (!school) return notFound()

  return (
    <div className='p-6'>
      <PageHeader title={t("schoolsSchema.updateTitle")} description={t("schoolsSchema.updateDescription")} />
      <UpdateSchoolForm school={school} />
    </div>
  )
}
