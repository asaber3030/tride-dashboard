import React from "react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { FormItem, FormLabel, FormControl, FormDescription, FormMessage } from "@/components/ui/form"
import { FieldError, UseFormRegisterReturn, FieldValues, Path } from "react-hook-form"
import { cn } from "@/lib/utils"

type InputFieldProps<TFieldValues extends FieldValues = FieldValues> = {
  label: string
  name: Path<TFieldValues>
  description?: string
  placeholder?: string
  type?: string
  className?: string
  isTextarea?: boolean
  disabled?: boolean
  defaultValue?: string | number
  field: UseFormRegisterReturn
  error?: FieldError
  step?: any
}

export function InputField<TFieldValues extends FieldValues = FieldValues>({ step, label, name, description, placeholder, type = "text", className, isTextarea = false, disabled = false, defaultValue, field, error }: InputFieldProps<TFieldValues>) {
  return (
    <FormItem>
      <FormLabel htmlFor={name}>{label}</FormLabel>
      <FormControl>
        {isTextarea ? (
          <Textarea id={name} disabled={disabled} placeholder={placeholder} className={cn("resize-none h-32", className)} defaultValue={defaultValue as string} {...field} />
        ) : (
          <Input step={step} id={name} disabled={disabled} type={type} placeholder={placeholder} defaultValue={defaultValue} className={cn(className)} {...field} />
        )}
      </FormControl>
      {description && <FormDescription>{description}</FormDescription>}
      <FormMessage>{error?.message}</FormMessage>
    </FormItem>
  )
}
