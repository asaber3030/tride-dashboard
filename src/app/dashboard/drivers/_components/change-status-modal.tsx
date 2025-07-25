"use client"

import qk from "@/lib/query-keys"

import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useTranslations } from "next-intl"
import { useState } from "react"
import { useForm } from "react-hook-form"

import { handleError, showResponse } from "@/lib/utils"
import { updateDriverPapersStatusAction } from "../_helpers/actions"
import { zodResolver } from "@hookform/resolvers/zod"

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { LoadingButton } from "@/components/common/loading-button"
import { CitySchema } from "@/schema/models"
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import { Edit, SaveIcon } from "lucide-react"
import { Badge } from "@/components/ui/badge"

type Props = {
  driverId: number
  currentStatus: boolean
}

export const UpdateDriverStatusModal = ({ driverId, currentStatus }: Props) => {
  const [open, setOpen] = useState(false)

  const qc = useQueryClient()
  const t = useTranslations()

  const mutation = useMutation({
    mutationFn: ({ driverId }: { driverId: number }) => updateDriverPapersStatusAction(driverId, !currentStatus),
    onSuccess: (data) =>
      showResponse(data, () => {
        qc.invalidateQueries({ queryKey: qk.drivers.paginated() })
        setOpen(false)
      }),
    onError: (error: Error) => handleError(error)
  })

  const handleAction = () => {
    mutation.mutate({
      driverId
    })
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button icon={Edit} size='icon' variant='outline' />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t("updateDriversPaperStatusTitle")}</DialogTitle>
          <DialogDescription>{t("updateDriversPaperStatusDescription")}</DialogDescription>
        </DialogHeader>

        <p className='flex gap-2 items-center'>
          Current Status: <Badge variant={currentStatus ? "success" : "destructive"}>{currentStatus ? "Approved" : "Not Approved"}</Badge>
        </p>

        <LoadingButton variant={currentStatus ? "destructive" : "default"} onClick={handleAction} loading={mutation.isPending} icon={SaveIcon}>
          {currentStatus ? t("disapprove") : t("approve")}
        </LoadingButton>
      </DialogContent>
    </Dialog>
  )
}
