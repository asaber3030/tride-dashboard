"use client"

import qk from "@/lib/query-keys"

import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useTranslations } from "next-intl"
import { useState } from "react"
import { useForm } from "react-hook-form"

import { handleError, showResponse } from "@/lib/utils"
import { createAdminAction } from "../_helpers/actions"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { SingleFileUpload } from "@/components/common/form/file-field"
import { LoadingButton } from "@/components/common/loading-button"
import { AdminSchema } from "@/schema/models"
import { SelectField } from "@/components/common/form/select-field"
import { SelectItem } from "@/components/ui/select"
import { InputField } from "@/components/common/form/input-field"
import { Languages } from "@/lib/lists"
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import { Plus } from "lucide-react"

type TMut = {
  data: z.infer<typeof AdminSchema>
  file?: File
}

export const CreateAdminModal = () => {
  const [open, setOpen] = useState(false)
  const [profilePicture, setProfilePicture] = useState<File | undefined>()

  const form = useForm({
    resolver: zodResolver(AdminSchema),
    defaultValues: {
      language: "en"
    }
  })

  const qc = useQueryClient()
  const t = useTranslations()

  const mutation = useMutation({
    mutationFn: ({ data, file }: TMut) => createAdminAction(data, file),
    onSuccess: (data) =>
      showResponse(data, () => {
        qc.invalidateQueries({ queryKey: qk.admins.index() })
        form.reset()
        setProfilePicture(undefined)
        setOpen(false)
      }),
    onError: (error: Error) => handleError(error)
  })

  const handleAction = () => {
    mutation.mutate({
      data: form.getValues() as z.infer<typeof AdminSchema>,
      file: profilePicture
    })
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button icon={Plus}>{t("admins.create")}</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t("admins.createTitle")}</DialogTitle>
          <DialogDescription>{t("admins.createDescription")}</DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleAction)} className='space-y-4'>
            <InputField name='email' label={t("email")} field={form.register("email")} error={form.formState?.errors?.email} />
            <InputField name='first_name' label={t("firstName")} field={form.register("first_name")} error={form.formState?.errors?.first_name} />
            <InputField name='last_name' label={t("lastName")} field={form.register("last_name")} error={form.formState?.errors?.last_name} />
            <InputField name='password' type='password' label={t("password")} field={form.register("password")} error={form.formState?.errors?.password} />
            <SelectField name='language' control={form.control} label={t("language")} defaultValue='en' error={form.formState?.errors?.language}>
              {Languages.map((item) => (
                <SelectItem value={item.code}>{t(item.name)}</SelectItem>
              ))}
            </SelectField>
            <SingleFileUpload file={profilePicture} setFile={setProfilePicture} className='w-full' label={t("profilePicture")} />

            <LoadingButton loading={mutation.isPending} icon={Plus}>
              {t("create")}
            </LoadingButton>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
