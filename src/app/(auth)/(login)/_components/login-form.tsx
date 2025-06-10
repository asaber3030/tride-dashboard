"use client"

import Link from "next/link"

import { InputField } from "@/components/common/form/input-field"
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"

import { useTranslations } from "next-intl"
import { useForm } from "react-hook-form"
import { useMutation } from "@tanstack/react-query"

export const LoginForm = () => {
  const t = useTranslations()

  const form = useForm()
  const mutation = useMutation({})

  const handleLogin = () => {}

  return (
    <Form {...form}>
      <form className='space-y-4' onSubmit={form.handleSubmit(handleLogin)}>
        <InputField control={form.control} placeholder={t("enterYourEmail")} label={t("emailLabel")} type='email' name='email' />
        <InputField control={form.control} placeholder={t("enterYourPassword")} label={t("passwordLabel")} type='password' name='password' />

        <div className='flex items-center justify-between'>
          <Link href='/forgot-password' className='text-sm text-primary hover:text-blue-500'>
            {t("forgotPassword")}
          </Link>
        </div>

        <Button loading={mutation.isPending} className='w-full'>
          {t("signIn")}
        </Button>
      </form>
    </Form>
  )
}
