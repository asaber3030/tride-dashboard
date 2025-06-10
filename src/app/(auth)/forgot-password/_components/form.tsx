"use client"

import Link from "next/link"

import { InputField } from "@/components/common/form/input-field"
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"

import { useTranslations } from "next-intl"
import { useForm } from "react-hook-form"
import { useMutation } from "@tanstack/react-query"

export const ForgotPasswordForm = () => {
  const t = useTranslations()

  const form = useForm()
  const mutation = useMutation({})

  const handleLogin = () => {}

  return (
    <Form {...form}>
      <form className='space-y-4' onSubmit={form.handleSubmit(handleLogin)}>
        <InputField control={form.control} label={t("emailLabel")} type='email' name='email' />
        <Button loading={mutation.isPending} className='w-full'>
          {t("sendLink")}
        </Button>
      </form>
    </Form>
  )
}
