"use client"

import qk from "@/lib/query-keys"

import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useTranslations } from "next-intl"
import { useState } from "react"
import { useForm } from "react-hook-form"

import { handleError, showResponse } from "@/lib/utils"
import { updateCityAction } from "../_helpers/actions"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { LoadingButton } from "@/components/common/loading-button"
import { CitySchema } from "@/schema/models"
import { InputField } from "@/components/common/form/input-field"
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import { Edit, Plus } from "lucide-react"
import { City } from "@/types/models"
import { useGovernorates } from "../../governorates/_helpers/hooks"
import { SelectField } from "@/components/common/form/select-field"
import { SelectItem } from "@/components/ui/select"
import { InputSkeleton } from "@/components/common/skeletons/input"

type TMut = {
  data: z.infer<typeof CitySchema>
}
type Props = {
  city: City
}

export const UpdateCityModal = ({ city }: Props) => {
  const t = useTranslations()
  const qc = useQueryClient()

  const [open, setOpen] = useState(false)

  const form = useForm({
    resolver: zodResolver(CitySchema),
    defaultValues: {
      name: city.name,
      governorate_id: city.governorate_id
    }
  })

  const { data: governorates, isError: isGovernoratesHasError, isLoading: isGovernoratesLoading, error: governoratesError } = useGovernorates()

  const mutation = useMutation({
    mutationFn: ({ data }: TMut) => updateCityAction(city.id, data),
    onSuccess: (data) =>
      showResponse(data, () => {
        qc.invalidateQueries({ queryKey: qk.cities.paginated() })
        form.reset()
        setOpen(false)
      }),
    onError: (error: Error) => handleError(error)
  })

  const handleAction = () => {
    mutation.mutate({
      data: form.getValues() as z.infer<typeof CitySchema>
    })
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button icon={Edit} size='icon' variant='outline' />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t("citiesSchema.updateTitle")}</DialogTitle>
          <DialogDescription>{t("citiesSchema.updateDescription")}</DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleAction)} className='space-y-4'>
            <InputField name='name' label={t("name")} field={form.register("name")} error={form.formState?.errors?.name} />
            {isGovernoratesLoading ? (
              <InputSkeleton />
            ) : (
              <SelectField control={form.control} name='governorate_id' label={t("governorate")} defaultValue={city.governorate_id.toString()} valueAsNumber>
                {governorates?.map((item) => (
                  <SelectItem value={item.id.toString()}>{item.governorate_name}</SelectItem>
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
