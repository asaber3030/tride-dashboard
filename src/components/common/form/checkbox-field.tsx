import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "../../ui/form"
import { Control, FieldValues, Path } from "react-hook-form"
import { Checkbox } from "../../ui/checkbox"

type CheckboxFieldProps<TFieldValues extends FieldValues = FieldValues> = {
  label: string
  name: Path<TFieldValues>
  control: Control<TFieldValues>
}

export function CheckboxField<TFieldValues extends FieldValues = FieldValues>({ name, label, control }: CheckboxFieldProps<TFieldValues>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className='flex flex-row items-start gap-2 space-y-0'>
          <FormControl>
            <Checkbox checked={!!field.value} onCheckedChange={field.onChange} id={name} />
          </FormControl>
          <div className='space-y-1 leading-none'>
            <FormLabel htmlFor={name}>{label}</FormLabel>
            <FormMessage />
          </div>
        </FormItem>
      )}
    />
  )
}
