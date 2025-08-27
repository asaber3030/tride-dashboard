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
import { MergeManyRideGroupsFilters } from "./list-filter"
import { DefaultLoading } from "@/components/common/loader"
import { LoadingButton } from "@/components/common/loading-button"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { MergeSingleRideGroup } from "./single-ride-group"
import { MergeSingleDestinationRideGroup } from "./single-destination-ride-group"

type Props = {}

export const MergeManyRideGroupsList = ({}: Props) => {
  const qc = useQueryClient()
  const sp = useSearchParams()

  const [open, setOpen] = useState(false)
  const [selectedIds, setSelectedIds] = useState<number[]>([])
  const [destinationId, setDestinationId] = useState<number>()
  const [searchDestination, setSearchDestination] = useState<string>("")
  const [searchDestinationId, setSearchDestinationId] = useState<string>("")

  const {
    data: rideGroups,
    isLoading,
    isRefetching,
    isError,
    error
  } = usePaginatedRideGroups({
    name: sp.get("name") || "",
    school_id: sp.get("school_id") || "",
    ride_group_id: sp.get("ride_group_id") || ""
  })

  const {
    data: destinationRideGroups,
    isLoading: isDestinationLoading,
    isRefetching: isDestinationRefetching,
    isError: isDestinationError,
    error: destinationError
  } = usePaginatedRideGroups({
    name: searchDestination,
    ride_group_id: searchDestinationId
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

  const onSelectId = (id: number) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter((item) => item !== id))
    } else {
      setSelectedIds([...selectedIds, id])
    }
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
      <div>
        <div className='flex items-center justify-between mb-4'>
          <section>
            <h1 className='text-xl font-semibold'>Select Ride Groups</h1>
            <p className='text-muted-foreground text-sm'>Select the ride groups you want to merge.</p>
          </section>

          <MergeManyRideGroupsFilters />
        </div>

        <div>
          {isLoading || isRefetching ? (
            <DefaultLoading />
          ) : (
            <div>
              {rideGroups?.rows.length === 0 ? (
                <div className='flex items-center justify-between mb-4'>No ride groups found. Please adjust your filters.</div>
              ) : (
                <div className='grid xl:grid-cols-4 grid-cols-1 gap-2'>
                  {rideGroups?.rows
                    .filter((t) => t.group_type == "regular")
                    .filter((t) => t.current_seats_taken < 5)
                    .map((item) => (
                      <MergeSingleRideGroup group={item} selectedIds={selectedIds} onSelectId={onSelectId} key={`ride-group-item-${item.id}`} />
                    ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

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

        <div>
          {isDestinationLoading || isDestinationRefetching ? (
            <DefaultLoading />
          ) : (
            <div>
              {destinationRideGroups?.rows.length === 0 ? (
                <div className='flex items-center justify-between mb-4'>No ride groups found. Please adjust your filters.</div>
              ) : (
                <div className='grid xl:grid-cols-4 grid-cols-1 gap-2'>
                  {destinationRideGroups?.rows
                    .filter((t) => t.group_type == "regular")
                    .filter((t) => t.current_seats_taken < 5)
                    .map((item) => (
                      <MergeSingleDestinationRideGroup group={item} destinationId={destinationId} setDestinationId={setDestinationId} key={`ride-group-destination-${item.id}`} />
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
