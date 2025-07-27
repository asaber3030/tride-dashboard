"use client"

import Link from "next/link"

import { InputField } from "@/components/common/form/input-field"
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"

import { useTranslations } from "next-intl"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { LoginSchema } from "@/schema/auth"
import { useLogin } from "@/hooks/auth/use-login"
import { LoadingButton } from "@/components/common/loading-button"

export const LoginForm = () => {
  const t = useTranslations()

  const form = useForm({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "admin@tride.com",
      password: "admin123"
    }
  })

  const login = useLogin()

  const handleLogin = () => {
    login.mutate({
      data: form.getValues()
    })
  }

  return (
    <Form {...form}>
      <form className='space-y-4' onSubmit={form.handleSubmit(handleLogin)}>
        <InputField field={form.register("email")} placeholder={t("enterYourEmail")} label={t("emailLabel")} type='email' name='email' />
        <InputField field={form.register("password")} placeholder={t("enterYourPassword")} label={t("passwordLabel")} type='password' name='password' />

        <div className='flex items-center justify-between'>
          <Link href='/forgot-password' className='text-sm text-primary hover:text-blue-500'>
            {t("forgotPassword")}
          </Link>
        </div>

        <LoadingButton loading={login.isPending} className='w-full'>
          {t("signIn")}
        </LoadingButton>
      </form>
    </Form>
  )
}
