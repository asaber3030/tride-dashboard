import { useRideGroupTrackerStore } from "@/store/ride-group-store"
import { useTranslations } from "next-intl"
import { useAllSchools } from "@/app/dashboard/schools/_helpers/hooks"
import { useRouter } from "next/navigation"

import { build } from "search-params"

import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DefaultLoading } from "@/components/common/loader"
import { Label } from "@/components/ui/label"

export const RideGroupTrackerSchoolFilter = ({ searchParams }: { searchParams: TObject }) => {
  const router = useRouter()
  const t = useTranslations()

  const { data: schools, isLoading: isSchoolsLoading, isError: isSchoolsHasError, error: schoolsError } = useAllSchools({ ...searchParams, search: "" })
  const { schoolId, setSchoolId, setSchoolCoordinates, setRideGroupId } = useRideGroupTrackerStore()

  const handleSchoolChange = (value: string) => {
    const query = build({ ...searchParams, school_id: value })
    const school = schools?.find((i) => i.id == +value)

    setSchoolId(+value)
    setRideGroupId(null)

    if (school) {
      setSchoolCoordinates({
        lat: +school.lat,
        lng: +school.lng
      })
    }

    router.push(`?${query}`)
  }

  if (isSchoolsLoading) return <LoadingState />
  if (isSchoolsHasError) return <ErrorState error={schoolsError} />
  if (!schools || schools.length === 0) return <EmptyState />

  return (
    <div className='space-y-2'>
      <Label>{t("school")}</Label>
      <Select onValueChange={handleSchoolChange} defaultValue={schoolId?.toString()}>
        <SelectTrigger className='w-full'>
          <SelectValue placeholder={t("schools")} />
        </SelectTrigger>
        <SelectContent className='max-h-[320px]'>
          <SelectGroup>
            <SelectLabel>{t("schools")}</SelectLabel>
            {schools?.map((school) => (
              <SelectItem key={`school_item_${school.id}`} value={school.id.toString()}>
                {school.school_name}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  )
}

export const LoadingState = () => {
  return (
    <div className='flex items-center justify-center h-full'>
      <DefaultLoading variant='pinwheel' />
    </div>
  )
}

export const ErrorState = ({ error }: { error: Error }) => {
  return (
    <div className='text-red-500 text-center'>
      <p>{error.message}</p>
    </div>
  )
}

export const EmptyState = () => {
  const t = useTranslations()
  return (
    <div className='text-gray-500 text-center'>
      <p>{t("noSchoolsFound")}</p>
    </div>
  )
}
