import { useMutation } from "@tanstack/react-query"
import { useState } from "react"

import { exportPaymentsToExcel } from "../_helpers/actions"
import { toast } from "react-toastify"

import { LoadingButton } from "@/components/common/loading-button"
import { TableAction } from "@/components/common/table-action"
import { DatePicker } from "@/components/common/date-picker"
import { FileIcon } from "lucide-react"
import { CreateParentSubscriptionForm } from "./create-subscription"
import { ExportButton } from "@/components/common/export-button"

export const PaymentsFilters = () => {
  const [startDate, setStartDate] = useState<Date | undefined>(undefined)
  const [endDate, setEndDate] = useState<Date | undefined>(undefined)

  const url = `payments/export/all?${`from=${startDate?.toLocaleDateString("en-CA")}`}${`&to=${endDate?.toLocaleDateString("en-CA")}`}`

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
      <div className='flex items-center gap-2'>
        <ExportButton disabled={!startDate || !endDate} url={url} />
        <CreateParentSubscriptionForm />
      </div>
    </TableAction>
  )
}
