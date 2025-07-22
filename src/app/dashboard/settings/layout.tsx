import { PageHeader } from "@/components/dashboard/page-header"
import { getTranslations } from "next-intl/server"

export default async function SettingsLayout({ children }: { children: React.ReactNode }) {
  const t = await getTranslations()

  return (
    <div>
      <PageHeader title={t("settings")} description={t("settings")} />
      {children}
    </div>
  )
}
