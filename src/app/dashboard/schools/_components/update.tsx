"use client"

import qk from "@/lib/query-keys"

import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useTranslations } from "next-intl"
import { useCities } from "../../cities/_helpers/hooks"
import { useForm } from "react-hook-form"

import { handleError, showResponse } from "@/lib/utils"
import { updateSchoolAction } from "../_helpers/actions"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"

import { GOOGLE_MAPS_API_KEY } from "@/lib/constants"

import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api"
import { InputSkeleton } from "@/components/common/skeletons/input"
import { LoadingButton } from "@/components/common/loading-button"
import { SchoolSchema } from "@/schema/models"
import { SelectField } from "@/components/common/form/select-field"
import { InputField } from "@/components/common/form/input-field"
import { SelectItem } from "@/components/ui/select"
import { School } from "@/types/models"
import { Form } from "@/components/ui/form"
import { Edit } from "lucide-react"

type TMut = {
  data: z.infer<typeof SchoolSchema>
}

export const UpdateSchoolForm = ({ school }: { school: School }) => {
  const { data: cities, isLoading: isCitiesLoading } = useCities()

  const qc = useQueryClient()
  const t = useTranslations()

  const form = useForm({
    resolver: zodResolver(SchoolSchema),
    defaultValues: {
      school_name: school.school_name,
      city_id: school.city_id,
      lat: parseFloat(`${school.lat}`),
      lng: parseFloat(`${school.lng}`)
    }
  })

  const mutation = useMutation({
    mutationFn: ({ data }: TMut) => updateSchoolAction(school.id, data),
    onSuccess: (data) =>
      showResponse(data, () => {
        qc.invalidateQueries({ queryKey: qk.schools.paginated() })
        form.reset()
      }),
    onError: (error: Error) => handleError(error)
  })

  const handleAction = () => {
    mutation.mutate({
      data: form.getValues() as z.infer<typeof SchoolSchema>
    })
  }

  const handleMapClick = (e: google.maps.MapMouseEvent) => {
    if (e.latLng) {
      form.setValue("lat", parseFloat(e.latLng.lat().toFixed(6)))
      form.setValue("lng", parseFloat(e.latLng.lng().toFixed(6)))
    }
  }

  const currentLat = form.watch("lat")
  const currentLng = form.watch("lng")

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleAction)} className='space-y-4' noValidate>
        <InputField name='school_name' label={t("name")} field={form.register("school_name")} error={form.formState?.errors?.school_name} />

        <div className='grid xl:grid-cols-2 grid-cols-1 gap-2'>
          <InputField disabled name='lat' label={t("latitude")} field={form.register("lat")} error={form.formState?.errors?.lat} type='number' step='any' />
          <InputField disabled name='lng' label={t("longitude")} field={form.register("lng")} error={form.formState?.errors?.lng} type='number' step='any' />
        </div>

        <LoadScript googleMapsApiKey={GOOGLE_MAPS_API_KEY}>
          <GoogleMap
            mapContainerStyle={{
              width: "100%",
              height: "500px"
            }}
            center={{ lat: parseFloat(`${school.lat}`), lng: parseFloat(`${school.lng}`) }}
            zoom={13}
            onClick={handleMapClick}
          >
            {currentLat && currentLng && <Marker position={{ lat: currentLat, lng: currentLng }} />}
          </GoogleMap>
        </LoadScript>

        {isCitiesLoading ? (
          <InputSkeleton />
        ) : (
          <SelectField control={form.control} name='city_id' label={t("city")} defaultValue={school.city_id.toString()} valueAsNumber error={form.formState?.errors?.city_id}>
            {cities?.map((item) => (
              <SelectItem value={item.id.toString()}>{item.name}</SelectItem>
            ))}
          </SelectField>
        )}
        <LoadingButton loading={mutation.isPending} icon={Edit}>
          {t("update")}
        </LoadingButton>
      </form>
    </Form>
  )
}
