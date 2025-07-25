"use client"

import * as React from "react"
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Label } from "../ui/label"

type Props = {
  label: string
  date: Date | undefined
  setDate: React.Dispatch<React.SetStateAction<Date | undefined>>
}

export function DatePicker({ label, date, setDate }: Props) {
  console.log({ date })
  return (
    <div className='space-y-2'>
      <Label>{label}</Label>
      <Popover>
        <PopoverTrigger asChild>
          <Button variant='outline' data-empty={!date} className='data-[empty=true]:text-muted-foreground w-[280px] justify-start text-left font-normal'>
            <CalendarIcon />
            {date ? format(date, "yyyy-MM-dd") : <span>Pick a date</span>} {/* Updated format */}
          </Button>
        </PopoverTrigger>
        <PopoverContent className='w-auto p-0'>
          <Calendar
            mode='single'
            selected={date}
            onSelect={(selectedDate) => {
              if (selectedDate) {
                setDate(selectedDate)
              }
            }}
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}
