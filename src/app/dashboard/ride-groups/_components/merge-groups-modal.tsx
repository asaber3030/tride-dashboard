"use client"

import { useState } from "react"

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { FullRideGroup } from "@/types/models"
import { Button } from "@/components/ui/button"
import { Edit, Rotate3D } from "lucide-react"
import { useTranslations } from "next-intl"
import { usePaginatedRideGroups } from "../_helpers/hooks"
import { SearchableData } from "@/components/common/form/searchable-data"
import { Form } from "@/components/ui/form"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { mergeRideGroupAction } from "../_helpers/actions"
import { handleError, showResponse } from "@/lib/utils"
import { toast } from "react-toastify"
import { LoadingButton } from "@/components/common/loading-button"
import qk from "@/lib/query-keys"

type Props = {
  rideGroup: FullRideGroup
}

type Mutation = {
  groupId: number
  destinationId: number
}

export const MergeGroupModal = ({ rideGroup }: Props) => {
  const qc = useQueryClient()
  const t = useTranslations()

  const [search, setSearch] = useState<string>("")
  const [open, setOpen] = useState<boolean>(false)
  const [debouncedSearch] = useState<string>(search)

  const { data, isLoading, isRefetching } = usePaginatedRideGroups({
    name: debouncedSearch
  })

  const form = useForm({
    resolver: zodResolver(
      z.object({
        groupId: z.number().min(1)
      })
    )
  })

  const mutation = useMutation({
    mutationFn: ({ groupId, destinationId }: Mutation) => mergeRideGroupAction(groupId, destinationId),
    onSuccess: (data) => {
      qc.invalidateQueries({ queryKey: qk.rideGroups.paginated() })
      showResponse(data)
      setOpen(false)
    },
    onError: (error) => {
      console.log(error)
      handleError(error)
    }
  })

  const handleSubmit = async () => {
    if (!form.getValues("groupId")) {
      toast.error(t("pleaseSelectDestationionGroup"))
      return
    }
    mutation.mutate({
      groupId: rideGroup.id,
      destinationId: form.getValues("groupId")
    })
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button icon={Rotate3D} size='icon' variant='outline' />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t("mergeGroupsTitle")}</DialogTitle>
          <DialogDescription>{t("mergeGroupsDescription")}</DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className='space-y-2'>
            <SearchableData
              data={data?.rows
                .filter((group) => group.id != rideGroup.id)
                .map((group) => ({
                  id: group.id,
                  label: group.group_name
                }))}
              search={search}
              setSearch={setSearch}
              label={t("mergeGroupsLabel")}
              defaultSelected={rideGroup.group_name}
              defaultSelectedId={rideGroup.id}
              loading={isLoading || isRefetching}
              form={form}
              formItem='groupId'
            />

            <LoadingButton loading={mutation.isPending} className='w-full'>
              {t("mergeGroupsButton")}
            </LoadingButton>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
