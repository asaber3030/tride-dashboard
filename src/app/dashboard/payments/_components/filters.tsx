import { useMutation } from "@tanstack/react-query"
import { useState } from "react"

import { exportPaymentsToExcel } from "../_helpers/actions"
import { toast } from "react-toastify"

import { LoadingButton } from "@/components/common/loading-button"
import { TableAction } from "@/components/common/table-action"
import { DatePicker } from "@/components/common/date-picker"
import { FileIcon } from "lucide-react"

export const PaymentsFilters = () => {
  const [startDate, setStartDate] = useState<Date | undefined>(undefined)
  const [endDate, setEndDate] = useState<Date | undefined>(undefined)

  const mutation = useMutation({
    mutationFn: async ({ startDate, endDate }: { startDate: Date; endDate: Date }) => {
      const blob = await exportPaymentsToExcel(startDate, endDate)
      const url = window.URL.createObjectURL(blob)

      const link = document.createElement("a")
      link.href = url
      link.setAttribute("download", "payments.xlsx")
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)

      window.URL.revokeObjectURL(url)
    },
    onSuccess: () => {
      toast.success("Payments exported successfully!")
    },
    onError: (error: Error) => {
      toast.error(`Failed to export payments: ${error.message}`)
    }
  })

  const handleExport = () => {
    if (!startDate || !endDate) {
      toast.error("Please select both start and end dates.")
      return
    }

    mutation.mutate({
      startDate,
      endDate
    })
  }

  return (
    <TableAction
      leftElements={
        <div className='flex gap-2 items-center'>
          <DatePicker label='Start Date' date={startDate} setDate={setStartDate} />
          <DatePicker label='End Date' date={endDate} setDate={setEndDate} />
        </div>
      }
      className='mb-4'
    >
      <LoadingButton icon={FileIcon} loading={mutation.isPending} onClick={handleExport}>
        Export
      </LoadingButton>
    </TableAction>
  )
}
