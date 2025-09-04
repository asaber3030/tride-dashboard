"use client"

import qk from "@/lib/query-keys"

import { useMutation, useQueryClient } from "@tanstack/react-query"
import { usePaginatedRideGroups } from "../../_helpers/hooks"
import { useSearchParams } from "next/navigation"
import { useState } from "react"

import { handleError, showResponse } from "@/lib/utils"
import { mergeManyRideGroups } from "../../_helpers/actions"
import { toast } from "react-toastify"

import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import { MergeSingleDestinationRideGroup } from "./single-destination-ride-group"
import { MergeManyRideGroupsFilters } from "./list-filter"
import { MergeSingleRideGroup } from "./single-ride-group"
import { DefaultLoading } from "@/components/common/loader"
import { FullRideGroup } from "@/types/models"
import { LoadingButton } from "@/components/common/loading-button"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { useRideGroupMergeStore } from "@/store/merge-groups-store"
import { useTranslations } from "next-intl"
import { usePaginatedSchools } from "@/app/dashboard/schools/_helpers/hooks"
import { SearchableData } from "@/components/common/form/searchable-data"

type Props = {}

export const MergeManyRideGroupsList = ({}: Props) => {
  const qc = useQueryClient()
  const sp = useSearchParams()

  const t = useTranslations()

  const [open, setOpen] = useState(false)
  const [searchDestination, setSearchDestination] = useState<string>("")
  const [searchDestinationId, setSearchDestinationId] = useState<string>("")

  const [searchSchools, setSearchSchools] = useState<string>(sp.get("school_id") || "")
  const [searchGroups, setSearchGroups] = useState<string>(sp.get("name") || "")
  const [searchGroupsId, setSearchGroupsId] = useState<string>(sp.get("ride_group_id") || "")
  const [selectedSchool, setSelectedSchool] = useState<string>("")

  const { selected, selectedIds, selectedDestination, destinationId, setDestinationId, setSelected, setSelectedDestination, setSelectedIds } = useRideGroupMergeStore()

  const {
    data: schools,
    isLoading: isSchoolsLoading,
    isRefetching: isSchoolsRefetching,
    isError: isSchoolsHasError,
    error: schoolsError
  } = usePaginatedSchools({
    name: searchSchools
  })

  const {
    data: rideGroups,
    isLoading,
    isRefetching,
    isError,
    error
  } = usePaginatedRideGroups({
    name: searchGroups,
    school_id: selectedSchool,
    ride_group_id: searchGroupsId,
    type: "regular"
  })

  console.log({ rideGroups })

  const {
    data: destinationRideGroups,
    isLoading: isDestinationLoading,
    isRefetching: isDestinationRefetching,
    isError: isDestinationError,
    error: destinationError
  } = usePaginatedRideGroups({
    name: searchDestination,
    ride_group_id: searchDestinationId,
    type: "regular"
  })

  const mergeMutation = useMutation({
    mutationFn: ({ ids, destinationId }: { ids: number[]; destinationId: number }) => mergeManyRideGroups(ids, destinationId),
    onSuccess: (data) =>
      showResponse(data, () => {
        qc.invalidateQueries({ queryKey: qk.rideGroups.paginated() })
        setOpen(false)
        setSelectedIds([])
        setDestinationId(undefined)
      }),
    onError: (error) => handleError(error)
  })

  const onSelectId = (id: number, rideGroup: FullRideGroup) => {
    if (selectedIds.includes(id)) {
      setSelected(selected.filter((item) => item.id !== id))
      setSelectedIds(selectedIds.filter((item) => item !== id))
    } else {
      setSelected([...selected, rideGroup])
      setSelectedIds([...selectedIds, id])
    }
  }

  const onSelectDestination = (id: number, item: FullRideGroup) => {
    if (selectedDestination?.id === id) {
      setSelectedDestination(undefined)
      setDestinationId(undefined)
    } else {
      setSelectedDestination(item)
      setDestinationId(id)
    }
  }

  const onClearFilters = () => {
    setSearchGroups("")
    setSearchGroupsId("")
    setSearchSchools("")
    setSelectedSchool("")
  }

  const onMerge = () => {
    if (!selectedIds.length || !destinationId) {
      toast.error("Please select at least one ride group and a destination ride group to merge.")
      return
    }
    mergeMutation.mutate({ ids: selectedIds, destinationId })
  }

  return (
    <div>
      {/* Ride Groups */}
      <div>
        <div className='flex items-center justify-between mb-4'>
          <section>
            <h1 className='text-xl font-semibold'>Select Ride Groups</h1>
            <p className='text-muted-foreground text-sm'>Select the ride groups you want to merge.</p>
          </section>

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
              <Button variant='outline' onClick={onClearFilters} className='w-fit'>
                Clear Filters
              </Button>
            </div>
          </div>
        </div>

        <div>
          {isError && <div className='text-red-500'>Error: {error instanceof Error ? error.message : "Unknown error"}</div>}
          {isDestinationError && <div className='text-red-500'>Error: {destinationError instanceof Error ? destinationError.message : "Unknown error"}</div>}
        </div>

        {selected.length > 0 && (
          <div className='mb-4'>
            <h2 className='text-lg font-medium mb-2'>Selected Ride Groups:</h2>
            <div className='flex flex-wrap gap-2'>
              {selected.map((group) => (
                <div key={`selected-ride-group-${group.id}`} className='px-3 py-1 bg-blue-100 text-blue-800 rounded-full flex items-center gap-2'>
                  <span>
                    {group.group_name} (ID: {group.id})
                  </span>
                  <button onClick={() => setSelected(selected.filter((i) => i.id != group.id))} className='text-red-500 hover:text-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 rounded-full' aria-label={`Remove ${group.group_name}`}>
                    &times;
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        <div>
          {isLoading || isRefetching ? (
            <DefaultLoading />
          ) : (
            <div>
              {rideGroups?.rows.length === 0 ? (
                <div className='flex items-center justify-between mb-4 border border-orange-600 text-orange-600 text-lg p-2 rounded-md'>No ride groups found. Please adjust your filters.</div>
              ) : (
                <div className='grid xl:grid-cols-4 grid-cols-1 gap-2'>
                  {rideGroups?.rows.map((item) => (
                    <MergeSingleRideGroup group={item} selectedIds={selectedIds} onSelectId={() => onSelectId(item.id, item)} key={`ride-group-item-${item.id}`} />
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Destination Ride Groups */}

      <Separator className='my-4' />

      <div>
        <div className='flex items-center justify-between mb-4'>
          <section>
            <h1 className='text-xl font-semibold'>Select Destination Ride Group</h1>
            <p className='text-muted-foreground text-sm'>Select the ride groups you want to merge.</p>
          </section>
          <div className='flex gap-2'>
            <div className='space-y-2 w-[450px]'>
              <Label>Search for ride groups</Label>
              <Input value={searchDestination} onChange={(e) => setSearchDestination(e.target.value)} placeholder='Search by name' className='w-full' type='text' />
            </div>
            <div className='space-y-2 w-[40px]'>
              <Label>ID</Label>
              <Input value={searchDestinationId} onChange={(e) => setSearchDestinationId(e.target.value)} placeholder='ID' className='w-full' type='text' />
            </div>
          </div>
        </div>

        {selectedDestination && (
          <div className='mb-4 w-fit'>
            <h2 className='text-lg font-medium mb-2'>Selected Destination</h2>
            <div className='px-3 py-1 bg-blue-100 text-blue-800 rounded-full flex items-center gap-2'>
              <span>
                {selectedDestination.group_name} (ID: {selectedDestination.id})
              </span>
              <button onClick={() => setSelectedDestination(undefined)} className='text-red-500 hover:text-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 rounded-full' aria-label={`Remove ${selectedDestination.group_name}`}>
                &times;
              </button>
            </div>
          </div>
        )}

        <div>
          {isDestinationLoading || isDestinationRefetching ? (
            <DefaultLoading />
          ) : (
            <div>
              {destinationRideGroups?.rows.length === 0 ? (
                <div className='flex items-center justify-between mb-4 border border-orange-600 text-orange-600 text-lg p-2 rounded-md'>No ride groups found. Please adjust your filters.</div>
              ) : (
                <div className='grid xl:grid-cols-4 grid-cols-1 gap-2'>
                  {destinationRideGroups?.rows.map((item) => (
                    <MergeSingleDestinationRideGroup group={item} destinationId={destinationId} setDestinationId={() => onSelectDestination(item.id, item)} key={`ride-group-destination-${item.id}`} />
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <Separator className='my-4' />

      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogTrigger asChild>
          <Button>Merge Groups</Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>This action cannot be undone. This will permanently delete your account and remove your data from our servers.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <LoadingButton loading={mergeMutation.isPending} onClick={onMerge}>
              Merge Groups
            </LoadingButton>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
