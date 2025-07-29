"use client"

import qk from "@/lib/query-keys"

import { updatePersonalInformationAction } from "@/actions/auth"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useTranslations } from "next-intl"
import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { useUser } from "@/hooks/auth/use-user"

import { handleError, showResponse } from "@/lib/utils"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"

import { UpdateAccountSchema } from "@/schema/auth"
import { LoadingButton } from "@/components/common/loading-button"
import { SelectField } from "@/components/common/form/select-field"
import { InputField } from "@/components/common/form/input-field"
import { SelectItem } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"

export function AccountSettingsForm() {
  const t = useTranslations()
  const qc = useQueryClient()

  const { user, isLoading } = useUser()

  const form = useForm({
    resolver: zodResolver(UpdateAccountSchema),
    defaultValues: {
      first_name: user?.first_name || "",
      last_name: user?.last_name || "",
      email: user?.account?.email || "",
      language: user?.language || "en"
    }
  })

  const mutation = useMutation({
    mutationFn: (data: z.infer<typeof UpdateAccountSchema>) => updatePersonalInformationAction(data),
    onSuccess: (data) =>
      showResponse(data, () => {
        qc.invalidateQueries({ queryKey: [qk.currentUser] })
      }),

    onError: (error) => handleError(error)
  })

  const handleSubmit = () => {
    mutation.mutate(form.getValues())
  }

  useEffect(() => {
    form.setValue("first_name", user?.first_name || "")
    form.setValue("last_name", user?.last_name || "")
    form.setValue("email", user?.account?.email || "")
    form.setValue("language", user?.language || "en")
  }, [isLoading, user])

  if (isLoading) return <Button disabled>{t("loading")}</Button>

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className='space-y-4'>
        <div className='grid grid-cols-2 gap-4'>
          <InputField label={t("firstName")} name='first_name' field={form.register("first_name")} />
          <InputField label={t("lastName")} name='last_name' field={form.register("last_name")} />
        </div>
        <InputField label={t("email")} name='email' field={form.register("email")} />
        <SelectField name='language' label={t("language")} control={form.control} defaultValue={user?.language}>
          <SelectItem value='en'>English</SelectItem>
          <SelectItem value='ar'>Arabic</SelectItem>
        </SelectField>
        <LoadingButton loading={mutation.isPending}>{t("save")}</LoadingButton>
      </form>
    </Form>
  )
}
