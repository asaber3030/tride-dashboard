import React from "react"
import { Control, FieldError, FieldValues, Path } from "react-hook-form"
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "../../ui/form"
import { Select, SelectContent, SelectTrigger, SelectValue } from "@/components/ui/select"

type SelectFieldProps<TFieldValues extends FieldValues = FieldValues> = {
  label: string
  name: Path<TFieldValues>
  control: Control<TFieldValues>
  placeholder?: string
  defaultValue?: string
  disabled?: boolean
  children: React.ReactNode
  valueAsNumber?: boolean
  error?: FieldError | undefined
}

export function SelectField<TFieldValues extends FieldValues = FieldValues>({ valueAsNumber, name, error, disabled = false, label, control, placeholder, children, defaultValue }: SelectFieldProps<TFieldValues>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Select onValueChange={valueAsNumber ? (value: string) => field.onChange(value === "" ? "" : parseInt(value)) : field.onChange} defaultValue={defaultValue} disabled={disabled}>
              <SelectTrigger className='bg-white w-full'>
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
              <SelectContent>{children}</SelectContent>
            </Select>
          </FormControl>
          <FormMessage>{error?.message}</FormMessage>
        </FormItem>
      )}
    />
  )
}
