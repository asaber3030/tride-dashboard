"use client"

import { usePaginatedSchools } from "@/app/dashboard/schools/_helpers/hooks"
import { useRouter, useSearchParams } from "next/navigation"
import { useState } from "react"

import { build } from "search-params"

import { SearchableData } from "@/components/common/form/searchable-data"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

type Props = {}

export const MergeManyRideGroupsDestinationFilters = ({}: Props) => {
  const router = useRouter()
  const sp = useSearchParams()

  const [searchSchools, setSearchSchools] = useState<string>(sp.get("school_id") || "")
  const [searchGroups, setSearchGroups] = useState<string>(sp.get("name") || "")
  const [selectedSchool, setSelectedSchool] = useState<string>("")

  const [debouncedSearchSchools] = useState<string>(searchSchools)

  const { data: schools, isLoading: isSchoolsLoading, isRefetching: isSchoolsRefetching, isError: isSchoolsHasError, error: schoolsError } = usePaginatedSchools({ name: debouncedSearchSchools })

  const onSubmitFilters = () => {
    const query = build({
      school_id: selectedSchool || undefined,
      name: searchGroups || undefined,
      ride_group_id: searchGroups || undefined
    })
    router.push(`?${query}`)
  }

  const onClearFilters = () => {
    router.push("?")
  }

  return (
    <div className='flex gap-2 flex-wrap justify-end items-center'>
      <div className='space-y-2 w-[350px]'>
        <Label>Search by name or id</Label>
        <Input value={searchGroups} onChange={(e) => setSearchGroups(e.target.value)} placeholder='Search by name or id' className='w-full' type='text' />
      </div>

      <div className='w-[350px]'>
        <SearchableData
          data={
            schools?.rows?.map((school) => ({
              id: school.id,
              label: school.school_name
            })) || []
          }
          setValue={setSelectedSchool}
          label='School'
          search={searchSchools}
          setSearch={setSearchSchools}
          loading={isSchoolsLoading || isSchoolsRefetching}
        />
      </div>

      <div className='flex gap-2 items-center'>
        <Button onClick={onSubmitFilters} disabled={!searchGroups && !selectedSchool} className='w-fit'>
          Apply Filters
        </Button>
        <Button variant='outline' onClick={onClearFilters} className='w-fit'>
          Clear Filters
        </Button>
      </div>
    </div>
  )
}
