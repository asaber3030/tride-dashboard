"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Eye, Edit, X, Filter, Trash } from "lucide-react"
import { SchoolEditModal } from "./update-modal"
import { Pagination } from "@/components/ui/pagination"
import { useTranslations } from "next-intl"

interface School {
  id: number
  name: string
  children: number
  drivers: number
  scheduledTime: string
  status: "active" | "inactive"
  selected: boolean
}

export function TripsTable() {
  const t = useTranslations()
  const [trips, setTrips] = useState<School[]>([
    {
      id: 1,
      name: t("schoolName"),
      children: 20,
      drivers: 15,
      scheduledTime: t("scheduledTime"),
      status: "active",
      selected: false
    },
    {
      id: 2,
      name: t("schoolName"),
      children: 20,
      drivers: 15,
      scheduledTime: t("scheduledTime"),
      status: "active",
      selected: false
    },
    {
      id: 3,
      name: t("schoolName"),
      children: 20,
      drivers: 15,
      scheduledTime: t("scheduledTime"),
      status: "inactive",
      selected: false
    },
    {
      id: 4,
      name: t("schoolName"),
      children: 20,
      drivers: 15,
      scheduledTime: t("scheduledTime"),
      status: "active",
      selected: false
    },
    {
      id: 5,
      name: t("schoolName"),
      children: 20,
      drivers: 15,
      scheduledTime: t("scheduledTime"),
      status: "active",
      selected: false
    },
    {
      id: 6,
      name: t("schoolName"),
      children: 20,
      drivers: 15,
      scheduledTime: t("scheduledTime"),
      status: "inactive",
      selected: false
    },
    {
      id: 7,
      name: t("schoolName"),
      children: 20,
      drivers: 15,
      scheduledTime: t("scheduledTime"),
      status: "active",
      selected: false
    },
    {
      id: 8,
      name: t("schoolName"),
      children: 20,
      drivers: 15,
      scheduledTime: t("scheduledTime"),
      status: "active",
      selected: false
    },
    {
      id: 9,
      name: t("schoolName"),
      children: 20,
      drivers: 15,
      scheduledTime: t("scheduledTime"),
      status: "inactive",
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

  const toggletripselection = (id: number) => {
    setTrips(trips.map((school) => (school.id === id ? { ...school, selected: !school.selected } : school)))
  }

  const handleEditSchool = (school: School) => {
    setSelectedSchool(school)
    setIsModalOpen(true)
  }

  const handleSaveSchool = (updatedSchool: School) => {
    setTrips(trips.map((school) => (school.id === updatedSchool.id ? updatedSchool : school)))
    setIsModalOpen(false)
    setSelectedSchool(null)
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
              <TableHead>{t("schoolNameLabel")}</TableHead>
              <TableHead>{t("childrenLabel")}</TableHead>
              <TableHead>{t("driversLabel")}</TableHead>
              <TableHead>{t("scheduledTimeLabel")}</TableHead>
              <TableHead>{t("statusLabel")}</TableHead>
              <TableHead className='w-20'></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {trips.map((school) => (
              <TableRow key={school.id}>
                <TableCell>
                  <Checkbox checked={school.selected} onCheckedChange={() => toggletripselection(school.id)} />
                </TableCell>
                <TableCell className='font-medium'>{school.name}</TableCell>
                <TableCell>{school.children}</TableCell>
                <TableCell>{school.drivers}</TableCell>
                <TableCell>{school.scheduledTime}</TableCell>
                <TableCell>
                  <Badge variant={school.status === "active" ? "default" : "warning"} className='capitalize'>
                    {t(`status${school.status.charAt(0).toUpperCase() + school.status.slice(1)}`)}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className='flex items-center gap-2'>
                    <Button variant='ghostDefault' size='icon' className='h-8 w-8'>
                      <Eye className='h-4 w-4' />
                    </Button>
                    <Button variant='ghostWarning' size='icon' className='h-8 w-8' onClick={() => handleEditSchool(school)}>
                      <Edit className='h-4 w-4' />
                    </Button>
                    <Button variant='ghostDestructive' size='icon' className='h-8 w-8' onClick={() => handleEditSchool(school)}>
                      <Trash className='h-4 w-4' />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <Pagination />

      {/* Edit Modal */}
      <SchoolEditModal
        school={selectedSchool}
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false)
          setSelectedSchool(null)
        }}
        onSave={handleSaveSchool}
      />
    </div>
  )
}
