"use client"

import { useGroupSubscriptionOfParent } from "../../_helpers/hooks"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"

import { updateParentGroupStatus, updateParentGroupSubscriptionStatus } from "../../_helpers/actions"
import { parentGroupStatusList, parentGroupSubscriptionStatusList } from "@/lib/lists"
import { handleError, showResponse } from "@/lib/utils"
import { zodResolver } from "@hookform/resolvers/zod"

import { ParentGroup } from "@/types/models"
import { Separator } from "@/components/ui/separator"
import { Form } from "@/components/ui/form"
import { SelectField } from "@/components/common/form/select-field"
import { UpdateParentGroupStatus } from "@/schema/models"
import { LoadingButton } from "@/components/common/loading-button"
import { SelectItem } from "@/components/ui/select"
import { SubscriptionDisplay } from "./subscription-details"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Rotate3D } from "lucide-react"
import qk from "@/lib/query-keys"

type Props = {
  parentGroup: ParentGroup
}

export const ChangeParentGroupStatus = ({ parentGroup }: Props) => {
  const [open, setOpen] = useState(false)

  const qc = useQueryClient()
  const sub = useGroupSubscriptionOfParent(parentGroup.group.id, parentGroup.parent.id)

  const form = useForm({
    resolver: zodResolver(UpdateParentGroupStatus),
    defaultValues: {
      groupStatus: parentGroup.status as any
    }
  })

  const groupMutation = useMutation({
    mutationFn: (status: any) => updateParentGroupStatus(parentGroup.group.id, parentGroup.parent.id, status),
    onSuccess: (data) =>
      showResponse(data, () => {
        qc.invalidateQueries({ queryKey: qk.rideGroups.singleParentGroupSubscription(parentGroup.group.id, parentGroup.parent.id) })
        qc.invalidateQueries({ queryKey: qk.rideGroups.singleParentGroups(parentGroup.group.id) })
        setOpen(false)
      }),
    onError: (error) => handleError(error)
  })

  const subMutation = useMutation({
    mutationFn: (status: any) => updateParentGroupSubscriptionStatus(parentGroup.group.id, parentGroup.parent.id, status),
    onSuccess: (data) => showResponse(data),
    onError: (error) => handleError(error)
  })

  const handleSubmit = () => {
    const values = form.getValues()
    groupMutation.mutate(values.groupStatus)
    subMutation.mutate(values.subscriptionStatus)
  }

  useEffect(() => {
    form.setValue("subscriptionStatus", sub.data?.status as any)
  }, [sub.data, sub.isLoading, sub.isRefetching])

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant='outline' icon={Rotate3D}>
          Change Status
        </Button>
      </DialogTrigger>
      <DialogContent className='min-w-7xl'>
        <DialogHeader>
          <DialogTitle>Parent Group Details</DialogTitle>
          <DialogDescription>Show All Parent Group Details and the subscription</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className='space-y-4'>
            {sub.isLoading ? <div>Loading Subscription...</div> : <section>{sub.isError ? <div className='text-red-500'>Error Loading Subscription: {sub.error?.message}</div> : <SubscriptionDisplay sub={sub.data!} parentGroup={parentGroup} />}</section>}

            <Separator className='my-4' />

            <SelectField defaultValue={parentGroup.status} control={form.control} name='groupStatus' label='Group Status'>
              {parentGroupStatusList.map((status) => (
                <SelectItem key={`group-status-${status.key}`} value={status.key}>
                  {status.label}
                </SelectItem>
              ))}
            </SelectField>

            {sub.data && (
              <SelectField defaultValue={sub.data.status} control={form.control} name='subscriptionStatus' label='Subscription Status'>
                {parentGroupSubscriptionStatusList.map((status) => (
                  <SelectItem key={`sub-${status.key}`} value={status.key}>
                    {status.label}
                  </SelectItem>
                ))}
              </SelectField>
            )}

            <LoadingButton loading={subMutation.isPending || groupMutation.isPending}>Submit</LoadingButton>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
