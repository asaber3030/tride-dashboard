"use client"

import qk from "@/lib/query-keys"

import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useTranslations } from "next-intl"
import { useState } from "react"
import { useForm } from "react-hook-form"

import { handleError, showResponse } from "@/lib/utils"
import { createDriverSalaryAction } from "../../_helpers/actions"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { LucideCircleDollarSign, SaveIcon } from "lucide-react"
import { CreateDriverSalarySchema } from "@/schema/models"
import { LoadingButton } from "@/components/common/loading-button"
import { SelectField } from "@/components/common/form/select-field"
import { InputField } from "@/components/common/form/input-field"
import { SelectItem } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"

type Props = {
  driverId: number
  children?: React.ReactNode
}

type Data = z.infer<typeof CreateDriverSalarySchema>

export const CreateDriverPaymentModal = ({ children, driverId }: Props) => {
  const [open, setOpen] = useState(false)

  const qc = useQueryClient()
  const t = useTranslations()

  const form = useForm({
    resolver: zodResolver(CreateDriverSalarySchema)
  })

  const mutation = useMutation({
    mutationFn: ({ data }: { data: Data }) => createDriverSalaryAction(driverId, data),
    onSuccess: (data) =>
      showResponse(data, () => {
        qc.invalidateQueries({ queryKey: qk.drivers.paginated() })
        setOpen(false)
      }),
    onError: (error) => handleError(error)
  })

  const handleAction = () => {
    mutation.mutate({
      data: form.getValues()
    })
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children ? children : <Button icon={LucideCircleDollarSign} size='icon' variant='outline' />}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t("createDriverPaymentTitle")}</DialogTitle>
          <DialogDescription>{t("createDriverPaymentDescription")}</DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleAction)} className='space-y-4'>
            <InputField name='salary' field={form.register("salary", { valueAsNumber: true })} label={t("salary")} type='number' step='0.01' />
            <InputField name='issued_for' field={form.register("issued_for", { valueAsDate: true })} label={t("issuedFor")} type='date' />
            <SelectField name='status' control={form.control} label={t("status")}>
              <SelectItem value='pending'>Pending</SelectItem>
              <SelectItem value='paid'>Paid</SelectItem>
            </SelectField>
          </form>
        </Form>

        <LoadingButton onClick={handleAction} loading={mutation.isPending} icon={SaveIcon}>
          {t("submit")}
        </LoadingButton>
      </DialogContent>
    </Dialog>
  )
}
