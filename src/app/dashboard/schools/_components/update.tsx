"use client"

import qk from "@/lib/query-keys"

import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useTranslations } from "next-intl"
import { useCities } from "../../cities/_helpers/hooks"
import { useState } from "react"
import { useForm } from "react-hook-form"

import { handleError, showResponse } from "@/lib/utils"
import { updateSchoolAction } from "../_helpers/actions"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { LoadingButton } from "@/components/common/loading-button"
import { SchoolSchema } from "@/schema/models"
import { InputField } from "@/components/common/form/input-field"
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import { Edit, Plus } from "lucide-react"
import { School } from "@/types/models"
import { SelectField } from "@/components/common/form/select-field"
import { SelectItem } from "@/components/ui/select"
import { InputSkeleton } from "@/components/common/skeletons/input"

type TMut = {
  data: z.infer<typeof SchoolSchema>
}
type Props = {
  school: School
}

export const UpdateSchoolModal = ({ school }: Props) => {
  const t = useTranslations()
  const qc = useQueryClient()

  const [open, setOpen] = useState(false)

  const form = useForm({
    resolver: zodResolver(SchoolSchema),
    defaultValues: {
      school_name: school.school_name,
      lat: school.lat,
      lng: school.lng,
      city_id: school.city_id
    }
  })

  const { data: cities, isError: isCitiesHasError, isLoading: isCitiesLoading, error: citiesError } = useCities()

  const mutation = useMutation({
    mutationFn: ({ data }: TMut) => updateSchoolAction(school.id, data),
    onSuccess: (data) =>
      showResponse(data, () => {
        qc.invalidateQueries({ queryKey: qk.schools.paginated() })
        form.reset()
        setOpen(false)
      }),
    onError: (error: Error) => handleError(error)
  })

  const handleAction = () => {
    mutation.mutate({
      data: form.getValues() as z.infer<typeof SchoolSchema>
    })
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button icon={Edit} size='icon' variant='outline' />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t("schoolsSchema.updateTitle")}</DialogTitle>
          <DialogDescription>{t("schoolsSchema.updateDescription")}</DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleAction)} className='space-y-4'>
            <InputField name='school_name' label={t("name")} field={form.register("school_name")} error={form.formState?.errors?.school_name} />
            <InputField name='lat' label={t("latitude")} field={form.register("lat")} error={form.formState?.errors?.lat} type='number' step='any' />
            <InputField name='lng' label={t("longitude")} field={form.register("lng")} error={form.formState?.errors?.lng} type='number' step='any' />

            {isCitiesLoading ? (
              <InputSkeleton />
            ) : (
              <SelectField control={form.control} name='city_id' label={t("city")} defaultValue={school.city_id.toString()} valueAsNumber>
                {cities?.map((item) => (
                  <SelectItem value={item.id.toString()}>{item.name}</SelectItem>
                ))}
              </SelectField>
            )}
            <LoadingButton loading={mutation.isPending} icon={Plus}>
              {t("update")}
            </LoadingButton>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
