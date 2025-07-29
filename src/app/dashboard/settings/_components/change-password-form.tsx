"use client"

import { useTranslations } from "next-intl"
import { useMutation } from "@tanstack/react-query"
import { useForm } from "react-hook-form"

import { handleError, showResponse } from "@/lib/utils"
import { updatePasswordAction } from "@/actions/auth"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"

import { UpdatePasswordSchema } from "@/schema/auth"
import { LoadingButton } from "@/components/common/loading-button"
import { InputField } from "@/components/common/form/input-field"
import { Form } from "@/components/ui/form"

export function AccountChangePasswordForm() {
  const t = useTranslations()

  const form = useForm({
    resolver: zodResolver(UpdatePasswordSchema)
  })

  const mutation = useMutation({
    mutationFn: (data: z.infer<typeof UpdatePasswordSchema>) => updatePasswordAction(data),
    onSuccess: (data) => showResponse(data),
    onError: (error) => handleError(error)
  })

  const handleSubmit = () => {
    mutation.mutate(form.getValues())
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className='space-y-4'>
        <InputField label={t("password")} name='password' field={form.register("password")} />
        <InputField label={t("newPassword")} name='new_password' field={form.register("new_password")} />
        <LoadingButton loading={mutation.isPending}>{t("save")}</LoadingButton>
      </form>
    </Form>
  )
}
