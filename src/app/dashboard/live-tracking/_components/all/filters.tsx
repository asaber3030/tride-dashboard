"use client"

import { useAllSchools, usePaginatedSchools } from "../../../schools/_helpers/hooks"
import { useTranslations } from "next-intl"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useForm } from "react-hook-form"

import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"

import { SearchableData } from "@/components/common/form/searchable-data"
import { ErrorLabel } from "@/components/common/error-label"
import { Button } from "@/components/ui/button"
import { Filter } from "lucide-react"
import { build } from "search-params"

type Props = {
  sp: TObject
  rideGroupsLength: number
}

export function FiltersSidebar({ sp, rideGroupsLength }: Props) {
  const router = useRouter()
  const t = useTranslations()

  const form = useForm({
    resolver: zodResolver(
      z.object({
        school_id: z.number().optional()
      })
    )
  })

  const [searchSchools, setSearchSchools] = useState("")

  const {
    data: schools,
    isLoading: isSchoolsLoading,
    isRefetching: isSchoolsRefetching,
    isError: isSchoolsError,
    error: schoolsError
  } = useAllSchools({
    name: searchSchools
  })

  const submitFilters = () => {
    router.push(
      `?${build({
        school_id: form.getValues("school_id")
      })}`
    )
  }

  const clearFilters = () => {
    form.reset()
    router.push("")
  }

  return (
    <div className='w-80 bg-white border-r border-gray-200 p-6 overflow-y-auto'>
      <div className='flex items-center gap-2 mb-6'>
        <Filter className='w-5 h-5' />
        <h2 className='text-lg font-semibold'>Filters</h2>
      </div>

      <div className='space-y-6'>
        <div className='space-y-1'>
          {isSchoolsError ? (
            <ErrorLabel>{schoolsError?.message || "Something went wrong"}</ErrorLabel>
          ) : (
            <SearchableData
              data={schools?.map((school) => ({
                id: school.id,
                label: school.school_name
              }))}
              search={searchSchools}
              setSearch={setSearchSchools}
              label={t("school")}
              form={form}
              formItem='school_id'
              loading={isSchoolsLoading || isSchoolsRefetching}
            />
          )}
        </div>

        <p className='text-gray-500 text-sm mb-2'>{rideGroupsLength} Ride Groups</p>

        <div className='flex gap-2 items-center'>
          <Button onClick={submitFilters}>Filter</Button>
          <Button onClick={clearFilters} variant='outline'>
            Clear Filters
          </Button>
        </div>
      </div>
    </div>
  )
}
