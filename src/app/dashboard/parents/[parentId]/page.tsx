import { PageHeader } from "@/components/dashboard/page-header"
import { ParentDetails } from "../_components/parent-details"
import { getTranslations } from "next-intl/server"

type Props = {
  params: Promise<{ parentId: string }>
}

export default async function DriverDocumentsPage({ params }: Props) {
  const { parentId } = await params

  const t = await getTranslations()
  const id = +parentId

  if (isNaN(id)) return <div>Invalid Parent ID</div>

  return (
    <div>
      <PageHeader title={t("parents")} description={t("parentsDescription")} />
      <ParentDetails parentId={id} />
    </div>
  )
}
