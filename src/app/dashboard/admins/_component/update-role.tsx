"use client"

import qk from "@/lib/query-keys"

import { useMutation, useQueryClient } from "@tanstack/react-query"
import { Fragment, useState } from "react"
import { useTranslations } from "next-intl"
import { useForm } from "react-hook-form"
import { useRoles } from "@/hooks/use-roles"

import { capitalize, handleError, showResponse } from "@/lib/utils"
import { updateAdminRoleAction } from "../_helpers/actions"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { UpdateAdminRoleSchema } from "@/schema/models"
import { LockIcon, SaveIcon } from "lucide-react"
import { LoadingButton } from "@/components/common/loading-button"
import { InputSkeleton } from "@/components/common/skeletons/input"
import { DisplayError } from "@/components/common/error"
import { SelectField } from "@/components/common/form/select-field"
import { SelectItem } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Admin } from "@/types/models"
import { Form } from "@/components/ui/form"

type TMut = {
  data: z.infer<typeof UpdateAdminRoleSchema>
}

type Props = {
  admin: Admin
}

export const UpdateAdminRoleModal = ({ admin }: Props) => {
  const [open, setOpen] = useState(false)

  const form = useForm({
    resolver: zodResolver(UpdateAdminRoleSchema),
    defaultValues: {
      role_id: admin.role.id
    }
  })

  const qc = useQueryClient()
  const t = useTranslations()

  const mutation = useMutation({
    mutationFn: ({ data }: TMut) => updateAdminRoleAction(admin.id, data),
    onSuccess: (data) =>
      showResponse(data, () => {
        qc.invalidateQueries({ queryKey: qk.admins.index() })
        form.reset()
        setOpen(false)
      }),
    onError: (error: Error) => handleError(error)
  })

  const { data: roles, isLoading: isRolesLoading, isError: isRolesError, error: rolesError } = useRoles()

  const handleAction = () => {
    mutation.mutate({
      data: form.getValues() as z.infer<typeof UpdateAdminRoleSchema>
    })
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button icon={LockIcon} variant='outline' size='icon' />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t("admins.updateRoleTitle")}</DialogTitle>
          <DialogDescription>{t("admins.updateRoleDescription")}</DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleAction)} className='space-y-4'>
            {isRolesLoading ? (
              <InputSkeleton className='w-full' />
            ) : (
              <Fragment>
                {isRolesError ? (
                  <DisplayError error={rolesError} />
                ) : (
                  <SelectField name='role_id' control={form.control} label={t("role")} error={form.formState?.errors?.role_id} valueAsNumber defaultValue={admin.role?.id.toString()}>
                    {roles?.map((item) => (
                      <SelectItem value={item.id.toString()}>{capitalize(item.role_name)}</SelectItem>
                    ))}
                  </SelectField>
                )}
              </Fragment>
            )}

            <LoadingButton loading={mutation.isPending} icon={SaveIcon}>
              {t("save")}
            </LoadingButton>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
