"use client"

import { CreateParentSubscriptionSchema } from "@/schema/models"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { usePaginatedRideGroups } from "../../ride-groups/_helpers/hooks"
import { usePaginatedParents } from "../../parents/_helpers/hooks"
import { useTranslations } from "next-intl"
import { usePlans } from "../../plans/_helpers/hooks"
import { useState } from "react"
import { useForm } from "react-hook-form"

import { cn, handleError, showResponse } from "@/lib/utils"
import { createParentCashAction } from "../_helpers/actions"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { SearchableData } from "@/components/common/form/searchable-data"
import { DefaultLoading } from "@/components/common/loader"
import { LoadingButton } from "@/components/common/loading-button"
import { SelectField } from "@/components/common/form/select-field"
import { SelectItem } from "@/components/ui/select"
import { ErrorLabel } from "@/components/common/error-label"
import { Button } from "@/components/ui/button"
import { Check, Plus } from "lucide-react"
import { Form } from "@/components/ui/form"
import { InputField } from "@/components/common/form/input-field"

export const CreateParentSubscriptionForm = () => {
  const t = useTranslations()
  const form = useForm({
    resolver: zodResolver(CreateParentSubscriptionSchema),
    defaultValues: {
      parent_id: 0,
      ride_group_id: 0,
      plan_id: 0,
      started_at: new Date()
    }
  })

  const [dialog, setDialog] = useState<boolean>(false)
  const [searchParents, setSearchParents] = useState<string>("")
  const [searchRideGroups, setSearchRideGroups] = useState<string>("")
  const [useDefaultPlan, setUseDefaultPlan] = useState<boolean>(false)

  const createMutation = useMutation({
    mutationFn: (data: z.infer<typeof CreateParentSubscriptionSchema>) => createParentCashAction(data),
    onSuccess: (data) =>
      showResponse(data, () => {
        form.reset()
        setDialog(false)
      }),
    onError: (error) => handleError(error)
  })

  const { data: plans, isLoading: isPlansLoading, isError: isPlansHasError, error: plansError } = usePlans()
  const { data: parents, isLoading: isParentsLoading, isRefetching: isParentsRefetching, isError: isParentsHasError, error: parentsError } = usePaginatedParents({ name: searchParents })
  const { data: rideGroups, isLoading: isRideGroupsLoading, isRefetching: isRideGroupsRefetching, isError: isRideGroupsHasError, error: rideGroupsError } = usePaginatedRideGroups({ name: searchParents })

  const handleSubmit = () => {
    createMutation.mutate({
      ...form.getValues(),
      default: useDefaultPlan
    })
  }

  return (
    <Dialog open={dialog} onOpenChange={setDialog}>
      <DialogTrigger asChild>
        <Button variant='outline' icon={Plus}>
          {t("createCashPayment")}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t("createCashPaymentTitle")}</DialogTitle>
          <DialogDescription>{t("createCashPaymentDescription")}</DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className='space-y-4'>
            {isPlansHasError ? (
              <ErrorLabel>{plansError?.message || "Something went wrong"}</ErrorLabel>
            ) : (
              <SelectField name='plan_id' label={t("plan")} control={form.control} valueAsNumber>
                {isPlansLoading ? (
                  <DefaultLoading />
                ) : (
                  <>
                    {plans?.map((plan) => (
                      <SelectItem key={`plan-item-${plan.id}`} value={`${plan.id}`}>
                        <b>ID#{plan.id}</b> - Months: {plan.months_count}
                      </SelectItem>
                    ))}
                  </>
                )}
              </SelectField>
            )}

            {isParentsHasError ? (
              <ErrorLabel>{parentsError?.message || "Something went wrong"}</ErrorLabel>
            ) : (
              <SearchableData
                data={parents?.rows?.map((parent) => ({
                  id: parent.id,
                  label: parent.name
                }))}
                search={searchParents}
                setSearch={setSearchParents}
                label={t("parent")}
                loading={isParentsLoading || isParentsRefetching}
                form={form}
                formItem='parent_id'
              />
            )}

            {isRideGroupsHasError ? (
              <ErrorLabel>{rideGroupsError?.message || "Something went wrong"}</ErrorLabel>
            ) : (
              <SearchableData
                data={rideGroups?.rows?.map((group) => ({
                  id: group.id,
                  label: group.group_name
                }))}
                search={searchRideGroups}
                setSearch={setSearchRideGroups}
                label={t("rideGroupLabel")}
                loading={isRideGroupsLoading || isRideGroupsRefetching}
                form={form}
                formItem='ride_group_id'
              />
            )}

            <div className={cn("border p-2 flex gap-2 items-center px-4 rounded-md font-medium w-fit cursor-pointer select-none text-sm", useDefaultPlan && "bg-green-500")} onClick={() => setUseDefaultPlan((old) => !old)}>
              {useDefaultPlan && <Check size={14} />}
              Use Plan Months ?
            </div>

            <InputField name='started_at' type='date' defaultValue={new Date().toISOString().split("T")[0]} field={form.register("started_at", { valueAsDate: true })} label='Start' />
            <InputField name='valid_until' type='date' defaultValue={new Date().toISOString().split("T")[0]} field={form.register("valid_until", { valueAsDate: true })} label='Valid Until' />

            <LoadingButton loading={createMutation.isPending}>{t("submit")}</LoadingButton>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
