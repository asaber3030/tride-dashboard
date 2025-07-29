"use client"

import qk from "@/lib/query-keys"

import { useTranslations } from "next-intl"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useState } from "react"

import { handleError, showResponse } from "@/lib/utils"
import { updatePictureAction } from "@/actions/auth"

import { LoadingButton } from "@/components/common/loading-button"
import { SingleFileUpload } from "@/components/common/form/file-field"

export function AccountChangePictureForm() {
  const t = useTranslations()
  const qc = useQueryClient()

  const [file, setFile] = useState<File>()

  const mutation = useMutation({
    mutationFn: (data: File | undefined) => updatePictureAction(data),
    onSuccess: (data) =>
      showResponse(data, () => {
        qc.invalidateQueries({ queryKey: [qk.currentUser] })
      }),
    onError: (error) => handleError(error)
  })

  const handleSubmit = () => {
    mutation.mutate(file)
  }

  return (
    <div className='space-y-4'>
      <SingleFileUpload file={file} setFile={setFile} />
      <LoadingButton onClick={handleSubmit} loading={mutation.isPending}>
        {t("save")}
      </LoadingButton>
    </div>
  )
}
