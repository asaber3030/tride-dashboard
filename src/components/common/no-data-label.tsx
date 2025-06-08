"use client"

import { cn } from "@/lib/utils"
import { ClassValue } from "class-variance-authority/types"
import { useTranslations } from "next-intl"

type Props = {
  label?: string
  className?: ClassValue
}

export const NoDataLabel = ({ label = "noDataAvailable", className }: Props) => {
  const t = useTranslations()
  return <div className={cn("text-gray-500 text-sm font-medium", className)}>{t(label)}</div>
}
