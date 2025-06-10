"use client"

import Link from "next/link"

import { InputField } from "@/components/common/form/input-field"
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"

import { useTranslations } from "next-intl"
import { useForm } from "react-hook-form"
import { useMutation } from "@tanstack/react-query"

export const VerifyEmailForm = () => {
  const t = useTranslations()

  const form = useForm()
  const mutation = useMutation({})

  const handleLogin = () => {}

  return (
    <Form {...form}>
      <form className='space-y-4' onSubmit={form.handleSubmit(handleLogin)}>
        <InputField className='w-full text-center tracking-widest' control={form.control} label={t("code")} type='text' name='text' />
        <Button loading={mutation.isPending} className='w-full'>
          {t("verify")}
        </Button>
      </form>
    </Form>
  )
}
