"use client"

import qk from "@/lib/query-keys"

import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useTranslations } from "next-intl"
import { useCities } from "../../cities/_helpers/hooks"
import { useState } from "react"
import { useForm } from "react-hook-form"

import { handleError, showResponse } from "@/lib/utils"
import { createSchoolAction } from "../_helpers/actions"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { LoadingButton } from "@/components/common/loading-button"
import { SchoolSchema } from "@/schema/models"
import { InputField } from "@/components/common/form/input-field"
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import { Plus } from "lucide-react"
import { InputSkeleton } from "@/components/common/skeletons/input"
import { SelectField } from "@/components/common/form/select-field"
import { SelectItem } from "@/components/ui/select"

type TMut = {
  data: z.infer<typeof SchoolSchema>
}

export const CreateSchoolModal = () => {
  const [open, setOpen] = useState(false)

  const form = useForm({
    resolver: zodResolver(SchoolSchema)
  })

  const { data: cities, isError: isCitiesHasError, isLoading: isCitiesLoading, error: citiesError } = useCities()

  const qc = useQueryClient()
  const t = useTranslations()

  const mutation = useMutation({
    mutationFn: ({ data }: TMut) => createSchoolAction(data),
    onSuccess: (data) =>
      showResponse(data, () => {
        qc.invalidateQueries({ queryKey: qk.schools.paginated() })
        form.reset()
        setOpen(false)
      }),
    onError: (error: Error) => handleError(error)
  })

  const handleAction = () => {
    console.log({ data: form.getValues() })
    mutation.mutate({
      data: form.getValues() as z.infer<typeof SchoolSchema>
    })
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button icon={Plus}>{t("create")}</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t("schoolsSchema.createTitle")}</DialogTitle>
          <DialogDescription>{t("schoolsSchema.createDescription")}</DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleAction)} className='space-y-4'>
            <InputField name='school_name' label={t("name")} field={form.register("school_name")} error={form.formState?.errors?.school_name} />
            <InputField name='lat' label={t("latitude")} field={form.register("lat")} error={form.formState?.errors?.lat} />
            <InputField name='lng' label={t("longitude")} field={form.register("lng")} error={form.formState?.errors?.lng} />

            {isCitiesLoading ? (
              <InputSkeleton />
            ) : (
              <SelectField control={form.control} name='city_id' label={t("city")} valueAsNumber>
                {cities?.map((item) => (
                  <SelectItem value={item.id.toString()}>{item.name}</SelectItem>
                ))}
              </SelectField>
            )}
            <LoadingButton loading={mutation.isPending} icon={Plus}>
              {t("create")}
            </LoadingButton>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
