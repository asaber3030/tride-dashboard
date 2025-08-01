"use client"

import qk from "@/lib/query-keys"

import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useTranslations } from "next-intl"
import { useState } from "react"

import { handleError, showResponse } from "@/lib/utils"
import { updateParentPapersStatusAction } from "../_helpers/actions"

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { LoadingButton } from "@/components/common/loading-button"
import { Button } from "@/components/ui/button"
import { Edit, SaveIcon } from "lucide-react"
import { Badge } from "@/components/ui/badge"

type Props = {
  parentId: number
  currentStatus: boolean
}

export const UpdateParentStatusModal = ({ parentId, currentStatus }: Props) => {
  const [open, setOpen] = useState(false)

  const qc = useQueryClient()
  const t = useTranslations()

  const mutation = useMutation({
    mutationFn: ({ parentId }: { parentId: number }) => updateParentPapersStatusAction(parentId, !currentStatus),
    onSuccess: (data) =>
      showResponse(data, () => {
        qc.invalidateQueries({ queryKey: qk.parents.paginated() })
        setOpen(false)
      }),
    onError: (error) => handleError(error)
  })

  const handleAction = () => {
    mutation.mutate({
      parentId
    })
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button icon={Edit} size='icon' variant='outline' />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t("updateParentPaperStatusTitle")}</DialogTitle>
          <DialogDescription>{t("updateParentPaperStatusDescription")}</DialogDescription>
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
