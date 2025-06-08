"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { X, Filter, FileDownIcon, Check, FileIcon, PrinterIcon, Edit, Plus } from "lucide-react"
import { Pagination } from "@/components/dashboard/pagination"
import { formatToEGP } from "@/lib/utils"
import { useTranslations } from "next-intl"

interface Payment {
  id: number
  name: string
  paid: number
  due: number
  offlinePayment: string
  method: string
  date: string
  status: "pending" | "completed" | "failed"
  selected: boolean
}

export function PaymentsTable() {
  const t = useTranslations()
  const [requests, setRequests] = useState<Payment[]>([
    {
      id: 1,
      name: t("driverName"),
      paid: 1000,
      due: 500,
      offlinePayment: t("offlinePaymentNo"),
      method: t("paymentMethodCreditCard"),
      date: "2023-10-01",
      status: "pending",
      selected: false
    },
    {
      id: 2,
      name: t("driverName"),
      paid: 1000,
      due: 500,
      offlinePayment: t("offlinePaymentNo"),
      method: t("paymentMethodCreditCard"),
      date: "2023-10-01",
      status: "pending",
      selected: false
    },
    {
      id: 3,
      name: t("driverName"),
      paid: 1000,
      due: 500,
      offlinePayment: t("offlinePaymentNo"),
      method: t("paymentMethodCreditCard"),
      date: "2023-10-01",
      status: "pending",
      selected: false
    },
    {
      id: 4,
      name: t("driverName"),
      paid: 1000,
      due: 500,
      offlinePayment: t("offlinePaymentNo"),
      method: t("paymentMethodCreditCard"),
      date: "2023-10-01",
      status: "pending",
      selected: false
    },
    {
      id: 5,
      name: t("driverName"),
      paid: 1000,
      due: 500,
      offlinePayment: t("offlinePaymentNo"),
      method: t("paymentMethodCreditCard"),
      date: "2023-10-01",
      status: "pending",
      selected: false
    },
    {
      id: 6,
      name: t("driverName"),
      paid: 1000,
      due: 500,
      offlinePayment: t("offlinePaymentNo"),
      method: t("paymentMethodCreditCard"),
      date: "2023-10-01",
      status: "pending",
      selected: false
    },
    {
      id: 7,
      name: t("driverName"),
      paid: 1000,
      due: 500,
      offlinePayment: t("offlinePaymentNo"),
      method: t("paymentMethodCreditCard"),
      date: "2023-10-01",
      status: "pending",
      selected: false
    },
    {
      id: 8,
      name: t("driverName"),
      paid: 1000,
      due: 500,
      offlinePayment: t("offlinePaymentNo"),
      method: t("paymentMethodCreditCard"),
      date: "2023-10-01",
      status: "pending",
      selected: false
    },
    {
      id: 9,
      name: t("driverName"),
      paid: 1000,
      due: 500,
      offlinePayment: t("offlinePaymentNo"),
      method: t("paymentMethodCreditCard"),
      date: "2023-10-01",
      status: "pending",
      selected: false
    }
  ])

  const [selectedPayment, setSelectedPayment] = useState<Payment | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const filters = [
    { label: t("filterAllTime"), removable: true },
    { label: t("filterPayment"), removable: true },
    { label: t("filterStatus"), removable: true },
    { label: t("filterDateTime"), removable: true }
  ]

  const toggleRequest = (id: number) => {
    setRequests(requests.map((Payment) => (Payment.id === id ? { ...Payment, selected: !Payment.selected } : Payment)))
  }

  const handleUpdateRequest = (Payment: Payment) => {
    setSelectedPayment(Payment)
    setIsModalOpen(true)
  }

  return (
    <div className='space-y-4'>
      <div className='flex items-center justify-between'>
        <div className='flex flex-wrap items-center gap-2'>
          {filters.map((filter, index) => (
            <Badge key={index} variant='outline' className='flex rounded-md items-center gap-1 px-3 py-2 cursor-pointer'>
              {filter.label}
              {filter.removable && <X className='h-3 w-3 cursor-pointer' />}
            </Badge>
          ))}
        </div>
        <div className='flex gap-2 flex-wrap'>
          <Button variant='outline' size='sm' className='flex items-center gap-2'>
            <Filter className='h-4 w-4' />
            {t("filtersButton")}
          </Button>
          <Button size='sm' className='bg-blue-500 hover:bg-blue-600'>
            {t("exportButton")}
          </Button>
        </div>
      </div>

      <div className='rounded-md border'>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className='w-12'></TableHead>
              <TableHead>{t("driverNameLabel")}</TableHead>
              <TableHead>{t("paidLabel")}</TableHead>
              <TableHead>{t("dueLabel")}</TableHead>
              <TableHead>{t("offlinePaymentLabel")}</TableHead>
              <TableHead>{t("methodLabel")}</TableHead>
              <TableHead>{t("dateLabel")}</TableHead>
              <TableHead>{t("statusLabel")}</TableHead>
              <TableHead className='w-20'>{t("actionsLabel")}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {requests.map((payment) => (
              <TableRow key={payment.id}>
                <TableCell>
                  <Checkbox checked={payment.selected} onCheckedChange={() => toggleRequest(payment.id)} />
                </TableCell>
                <TableCell className='font-medium'>{payment.name}</TableCell>
                <TableCell>{formatToEGP(payment.paid)}</TableCell>
                <TableCell>{formatToEGP(payment.due)}</TableCell>
                <TableCell>{payment.offlinePayment}</TableCell>
                <TableCell>{payment.method}</TableCell>
                <TableCell>{payment.date}</TableCell>
                <TableCell>
                  <Badge variant='warning' className='capitalize'>
                    {t(`status${payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}`)}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className='flex items-center gap-2'>
                    <Button variant='ghost' size='icon' className='h-8 w-8'>
                      <FileIcon className='h-4 w-4' />
                    </Button>
                    <Button variant='ghost' size='icon' className='h-8 w-8'>
                      <PrinterIcon className='h-4 w-4' />
                    </Button>
                    <Button variant='outline' size='icon' className='h-8 w-8'>
                      <Edit className='h-4 w-4' />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter className='bg-white'>
            <TableCell>
              <Button variant='outlineSuccess' icon={Plus}>
                {t("addButton")}
              </Button>
            </TableCell>
          </TableFooter>
        </Table>
      </div>

      <Pagination />
    </div>
  )
}
