"use client"

import axios from "axios"

import { FileIcon } from "lucide-react"
import { Button } from "@/components/ui/button"

import { API_URL, AUTH_COOKIE } from "@/lib/constants"
import { getCookie } from "cookies-next"
import { useMutation } from "@tanstack/react-query"
import { exportParents } from "../_helpers/actions"
import { toast } from "react-toastify"
import { LoadingButton } from "@/components/common/loading-button"

type Props = {}

export const ExportParentsButton = ({}: Props) => {
  const mutation = useMutation({
    mutationFn: async () => {
      const blob = await exportParents()
      const url = window.URL.createObjectURL(blob)

      const link = document.createElement("a")
      link.href = url
      link.setAttribute("download", "parents.xlsx")
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)

      window.URL.revokeObjectURL(url)
    },
    onSuccess: () => {
      toast.success("Payments exported successfully!")
    },
    onError: (error: Error) => {
      toast.error(`Failed to export payments: ${error.message}`)
    }
  })

  const handleExport = () => {
    mutation.mutate()
  }

  return (
    <LoadingButton loading={mutation.isPending} variant='outline' onClick={handleExport}>
      <FileIcon className='mr-2 h-4 w-4' />
      Export
    </LoadingButton>
  )
}
