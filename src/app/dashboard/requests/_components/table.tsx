"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { X, Filter, FileDownIcon, Check } from "lucide-react"
import { Pagination } from "@/components/dashboard/pagination"
import { useTranslations } from "next-intl"

interface School {
  id: number
  name: string
  phoneNumber: string
  submittedOn: string
  status: "pending"
  selected: boolean
}

export function RequestsTable() {
  const t = useTranslations()
  const [requests, setRequests] = useState<School[]>([
    {
      id: 1,
      name: t("driverName"),
      phoneNumber: "01123525123",
      status: "pending",
      submittedOn: t("submittedOnTime"),
      selected: false
    },
    {
      id: 2,
      name: t("driverName"),
      phoneNumber: "01123525123",
      status: "pending",
      submittedOn: t("submittedOnTime"),
      selected: false
    },
    {
      id: 3,
      name: t("driverName"),
      phoneNumber: "01123525123",
      status: "pending",
      submittedOn: t("submittedOnTime"),
      selected: false
    },
    {
      id: 4,
      name: t("driverName"),
      phoneNumber: "01123525123",
      status: "pending",
      submittedOn: t("submittedOnTime"),
      selected: false
    },
    {
      id: 5,
      name: t("driverName"),
      phoneNumber: "01123525123",
      status: "pending",
      submittedOn: t("submittedOnTime"),
      selected: false
    },
    {
      id: 6,
      name: t("driverName"),
      phoneNumber: "01123525123",
      status: "pending",
      submittedOn: t("submittedOnTime"),
      selected: false
    },
    {
      id: 7,
      name: t("driverName"),
      phoneNumber: "01123525123",
      status: "pending",
      submittedOn: t("submittedOnTime"),
      selected: false
    },
    {
      id: 8,
      name: t("driverName"),
      phoneNumber: "01123525123",
      status: "pending",
      submittedOn: t("submittedOnTime"),
      selected: false
    },
    {
      id: 9,
      name: t("driverName"),
      phoneNumber: "01123525123",
      status: "pending",
      submittedOn: t("submittedOnTime"),
      selected: false
    }
  ])

  const [selectedSchool, setSelectedSchool] = useState<School | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const filters = [
    { label: t("filterAllTime"), removable: true },
    { label: t("filterSchool"), removable: true },
    { label: t("filterStatus"), removable: true },
    { label: t("filterDateTime"), removable: true }
  ]

  const toggleRequest = (id: number) => {
    setRequests(requests.map((school) => (school.id === id ? { ...school, selected: !school.selected } : school)))
  }

  const handleUpdateRequest = (school: School) => {
    setSelectedSchool(school)
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
              <TableHead>{t("phoneNumberLabel")}</TableHead>
              <TableHead>{t("submittedOnLabel")}</TableHead>
              <TableHead>{t("documentsLabel")}</TableHead>
              <TableHead>{t("statusLabel")}</TableHead>
              <TableHead className='w-20'>{t("actionsLabel")}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {requests.map((school) => (
              <TableRow key={school.id}>
                <TableCell>
                  <Checkbox checked={school.selected} onCheckedChange={() => toggleRequest(school.id)} />
                </TableCell>
                <TableCell className='font-medium'>{school.name}</TableCell>
                <TableCell>{school.phoneNumber}</TableCell>
                <TableCell>{school.submittedOn}</TableCell>
                <TableCell className='flex gap-2'>
                  <FileDownIcon className='size-6 text-gray-500' />
                </TableCell>
                <TableCell>
                  <Badge variant={"warning"} className='capitalize'>
                    {t("statusPending")}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className='flex items-center gap-2'>
                    <Button variant='ghostSuccess' size='icon' className='h-8 w-8'>
                      <Check className='h-4 w-4' />
                    </Button>

                    <Button variant='ghostDestructive' size='icon' className='h-8 w-8' onClick={() => handleUpdateRequest(school)}>
                      <X className='h-4 w-4' />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Pagination />
    </div>
  )
}
