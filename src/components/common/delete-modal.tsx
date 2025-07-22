"use client"

import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useState } from "react"
import { handleError, showResponse } from "@/lib/utils"

import { LoadingButton } from "@/components/common/loading-button"

import { Button } from "@/components/ui/button"
import { Trash } from "lucide-react"
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { useTranslations } from "next-intl"

interface Props {
  deletedId: number
  dialogTitle?: string
  dialogDescription?: string
  children?: React.ReactNode
  asChild?: boolean
  queryKey?: any
  forceAction: (id: number) => Promise<ApiResponse<any>>
}

export const DeleteModal = ({ queryKey, dialogTitle = "deleteTitle", dialogDescription = "deleteDescription", deletedId, children, asChild = true, forceAction }: Props) => {
  const t = useTranslations()
  const [open, setOpen] = useState(false)

  const qc = useQueryClient()

  const forceDeleteMutation = useMutation({
    mutationFn: () => forceAction(deletedId),
    onSuccess: (data) =>
      showResponse(data, () => {
        setOpen(false)
        qc.invalidateQueries({ queryKey: queryKey })
      }),
    onError: (error: Error) => handleError(error)
  })

  const handleDelete = () => {
    forceDeleteMutation.mutate()
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild={asChild}>{children ? children : <Button variant='outlineDestructive' size='icon' icon={Trash} />}</DialogTrigger>

      <DialogContent className='bg-white'>
        <DialogHeader>
          <DialogTitle>{dialogTitle}</DialogTitle>
          <DialogDescription>{dialogDescription}</DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant='outline'>{t("close")}</Button>
          </DialogClose>
          <LoadingButton loading={forceDeleteMutation.isPending} variant='outlineDestructive' onClick={handleDelete}>
            {t("delete")}
          </LoadingButton>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
