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

export const MergeManyRideGroupsFilters = ({}: Props) => {
  const router = useRouter()
  const sp = useSearchParams()

  const [searchSchools, setSearchSchools] = useState<string>(sp.get("school_id") || "")
  const [searchGroups, setSearchGroups] = useState<string>(sp.get("name") || "")
  const [searchGroupsId, setSearchGroupsId] = useState<string>(sp.get("ride_group_id") || "")
  const [selectedSchool, setSelectedSchool] = useState<string>("")

  const {
    data: schools,
    isLoading: isSchoolsLoading,
    isRefetching: isSchoolsRefetching,
    isError: isSchoolsHasError,
    error: schoolsError
  } = usePaginatedSchools({
    name: searchSchools
  })

  const onSubmitFilters = () => {
    const query = build({
      school_id: selectedSchool || undefined,
      name: searchGroups || undefined,
      ride_group_id: searchGroupsId || undefined
    })
    router.push(`?${query}`)
  }

  const onClearFilters = () => {
    router.push("?")
  }

  return (
    <div className='flex gap-2 items-end justify-end'>
      <div className='flex gap-2 flex-wrap justify-end items-center'>
        <div className='space-y-2 w-[450px]'>
          <Label>Search for ride groups</Label>
          <Input value={searchGroups} onChange={(e) => setSearchGroups(e.target.value)} placeholder='Search by name' className='w-full' type='text' />
        </div>
        <div className='space-y-2 w-[40px]'>
          <Label>ID</Label>
          <Input value={searchGroupsId} onChange={(e) => setSearchGroupsId(e.target.value)} placeholder='ID' className='w-full' type='text' />
        </div>
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
        <Button onClick={onSubmitFilters} disabled={!searchGroups && !selectedSchool && !searchGroupsId} className='w-fit'>
          Apply Filters
        </Button>
        <Button variant='outline' onClick={onClearFilters} className='w-fit'>
          Clear Filters
        </Button>
      </div>
    </div>
  )
}
