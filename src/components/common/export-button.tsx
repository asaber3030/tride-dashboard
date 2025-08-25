"use client"

import { useTranslations } from "next-intl"
import { useMutation } from "@tanstack/react-query"

import { exportToExcel } from "@/actions/app"
import { toast } from "react-toastify"

import { LoadingButton } from "@/components/common/loading-button"
import { FileIcon } from "lucide-react"

type Props = { url: string; fileName?: string }

export const ExportButton = ({ url, fileName = "data" }: Props) => {
  const t = useTranslations()

  const mutation = useMutation({
    mutationFn: async () => {
      const blob = await exportToExcel(url)
      const windowUrl = window.URL.createObjectURL(blob)

      const link = document.createElement("a")
      link.href = windowUrl
      link.setAttribute("download", `${fileName}.xlsx`)
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)

      window.URL.revokeObjectURL(windowUrl)
    },
    onSuccess: () => {
      toast.success("Data exported successfully!")
    },
    onError: (error: Error) => {
      toast.error(`Failed to export Data: ${error.message}`)
    }
  })

  const handleExport = () => {
    mutation.mutate()
  }

  return (
    <LoadingButton loading={mutation.isPending} variant='outline' onClick={handleExport}>
      <FileIcon className='mr-2 h-4 w-4' />
      {t("export")}
    </LoadingButton>
  )
}
