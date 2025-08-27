"use client"

import qk from "@/lib/query-keys"

import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useTranslations } from "next-intl"
import { useState } from "react"

import { handleError, showResponse } from "@/lib/utils"
import { createDriverSalaryAction, updateDriverSalaryAction } from "../../_helpers/actions"

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { LoadingButton } from "@/components/common/loading-button"
import { CitySchema, CreateDriverSalarySchema } from "@/schema/models"
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import { Edit, EditIcon, LucideCircleDollarSign, SaveIcon } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { InputField } from "@/components/common/form/input-field"
import { SelectField } from "@/components/common/form/select-field"
import { SelectItem } from "@/components/ui/select"
import { DriverPayment } from "@/types/models"

type Props = {
  payment: DriverPayment
}

type Data = z.infer<typeof CreateDriverSalarySchema>

export const UpdateDriverPaymentModal = ({ payment }: Props) => {
  const [open, setOpen] = useState(false)

  const qc = useQueryClient()
  const t = useTranslations()

  const form = useForm({
    resolver: zodResolver(CreateDriverSalarySchema),
    defaultValues: {
      salary: payment.salary,
      issued_for: new Date(payment.issued_for).toISOString().split("T")[0] as any,
      status: payment.status
    }
  })

  const mutation = useMutation({
    mutationFn: ({ data }: { data: Data }) => updateDriverSalaryAction(payment.driver_id, payment.id, data),
    onSuccess: (data) =>
      showResponse(data, () => {
        qc.invalidateQueries({ queryKey: qk.drivers.singlePayments(payment.driver_id) })
        setOpen(false)
      }),
    onError: (error) => handleError(error)
  })

  const handleAction = () => {
    mutation.mutate({
      data: {
        ...form.getValues(),
        issued_for: new Date(form.getValues("issued_for"))
      }
    })
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button icon={EditIcon} size='icon' variant='outline' />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t("updateDriverPaymentTitle")}</DialogTitle>
          <DialogDescription>{t("updateDriverPaymentDescription")}</DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleAction)} className='space-y-4'>
            <InputField name='salary' field={form.register("salary", { valueAsNumber: true })} label={t("salary")} type='number' step='0.01' />
            <InputField name='issued_for' field={form.register("issued_for", { valueAsDate: true })} label={t("issuedFor")} type='date' />
            <SelectField defaultValue={payment.status} name='status' control={form.control} label={t("status")}>
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
