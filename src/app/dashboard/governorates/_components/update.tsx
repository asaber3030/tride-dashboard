"use client"

import qk from "@/lib/query-keys"

import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useTranslations } from "next-intl"
import { useState } from "react"
import { useForm } from "react-hook-form"

import { handleError, showResponse } from "@/lib/utils"
import { updateGovernorateAction } from "../_helpers/actions"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { LoadingButton } from "@/components/common/loading-button"
import { GovernorateSchema } from "@/schema/models"
import { InputField } from "@/components/common/form/input-field"
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import { Edit, Plus } from "lucide-react"
import { Governorate } from "@/types/models"

type TMut = {
  data: z.infer<typeof GovernorateSchema>
}
type Props = {
  governorate: Governorate
}

export const UpdateGovernorateModal = ({ governorate }: Props) => {
  const [open, setOpen] = useState(false)

  const form = useForm({
    resolver: zodResolver(GovernorateSchema),
    defaultValues: {
      governorate_name: governorate.governorate_name
    }
  })

  const qc = useQueryClient()
  const t = useTranslations()

  const mutation = useMutation({
    mutationFn: ({ data }: TMut) => updateGovernorateAction(governorate.id, data),
    onSuccess: (data) =>
      showResponse(data, () => {
        qc.invalidateQueries({ queryKey: qk.governorates.index() })
        form.reset()
        setOpen(false)
      }),
    onError: (error: Error) => handleError(error)
  })

  const handleAction = () => {
    mutation.mutate({
      data: form.getValues() as z.infer<typeof GovernorateSchema>
    })
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button icon={Edit} size='icon' variant='outline' />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t("governoratesSchema.createTitle")}</DialogTitle>
          <DialogDescription>{t("governoratesSchema.createDescription")}</DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleAction)} className='space-y-4'>
            <InputField name='governorate_name' label={t("governorateName")} field={form.register("governorate_name")} error={form.formState?.errors?.governorate_name} />
            <LoadingButton loading={mutation.isPending} icon={Plus}>
              {t("update")}
            </LoadingButton>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
