"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { X } from "lucide-react"
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

interface SchoolEditModalProps {
  school: School | null
  isOpen: boolean
  onClose: () => void
  onSave: (school: School) => void
}

export function SchoolEditModal({ school, isOpen, onClose, onSave }: SchoolEditModalProps) {
  const t = useTranslations()
  const [formData, setFormData] = useState({
    schoolName: "",
    location: "",
    operatingHours: "",
    status: "",
    contactPerson: "",
    phoneNumber: "",
    email: "",
    children: "",
    drivers: ""
  })

  useEffect(() => {
    if (school) {
      setFormData({
        schoolName: school.name,
        location: t("location"),
        operatingHours: school.scheduledTime,
        status: school.status,
        contactPerson: t("contactPerson"),
        phoneNumber: "01234567890",
        email: t("emailDefault"),
        children: school.children.toString(),
        drivers: school.drivers.toString()
      })
    }
  }, [school, t])

  const handleSave = () => {
    if (school) {
      const updatedSchool: School = {
        ...school,
        name: formData.schoolName,
        children: Number.parseInt(formData.children),
        drivers: Number.parseInt(formData.drivers),
        scheduledTime: formData.operatingHours,
        status: formData.status as "active" | "inactive"
      }
      onSave(updatedSchool)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className='max-w-2xl'>
        <DialogHeader>
          <div className='flex items-center justify-between'>
            <DialogTitle className='text-lg font-medium'>{t("editSchoolTitle")}</DialogTitle>
            <Button variant='ghost' size='icon' onClick={onClose}>
              <X className='h-4 w-4' />
            </Button>
          </div>
        </DialogHeader>

        <div className='grid grid-cols-2 gap-8 py-4'>
          {/* Basic Information */}
          <div className='space-y-4'>
            <h3 className='font-medium'>{t("basicInformation")}</h3>

            <div className='space-y-2'>
              <Label htmlFor='school-name'>{t("schoolNameLabel")}</Label>
              <Input id='school-name' value={formData.schoolName} onChange={(e) => setFormData({ ...formData, schoolName: e.target.value })} />
            </div>

            <div className='space-y-2'>
              <Label htmlFor='location'>{t("locationLabel")}</Label>
              <Input id='location' value={formData.location} onChange={(e) => setFormData({ ...formData, location: e.target.value })} />
            </div>

            <div className='space-y-2'>
              <Label htmlFor='operating-hours'>{t("operatingHoursLabel")}</Label>
              <Select value={formData.operatingHours} onValueChange={(value) => setFormData({ ...formData, operatingHours: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='7:00 am - 2:00 pm'>{t("operatingHoursOption1")}</SelectItem>
                  <SelectItem value='8:00 am - 3:00 pm'>{t("operatingHoursOption2")}</SelectItem>
                  <SelectItem value='9:00 am - 4:00 pm'>{t("operatingHoursOption3")}</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className='space-y-2'>
              <Label htmlFor='status'>{t("statusLabel")}</Label>
              <Select value={formData.status} onValueChange={(value) => setFormData({ ...formData, status: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='active'>{t("statusActive")}</SelectItem>
                  <SelectItem value='inactive'>{t("statusInactive")}</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Contact Information */}
          <div className='space-y-4'>
            <h3 className='font-medium'>{t("contactInformation")}</h3>

            <div className='space-y-2'>
              <Label htmlFor='contact-person'>{t("contactPersonLabel")}</Label>
              <Input id='contact-person' value={formData.contactPerson} onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })} />
            </div>

            <div className='space-y-2'>
              <Label htmlFor='phone-number'>{t("phoneNumberLabel")}</Label>
              <Input id='phone-number' value={formData.phoneNumber} onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })} />
            </div>

            <div className='space-y-2'>
              <Label htmlFor='email'>{t("emailLabel")}</Label>
              <Select value={formData.email} onValueChange={(value) => setFormData({ ...formData, email: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='@gmail.com'>{t("emailOptionGmail")}</SelectItem>
                  <SelectItem value='@yahoo.com'>{t("emailOptionYahoo")}</SelectItem>
                  <SelectItem value='@hotmail.com'>{t("emailOptionHotmail")}</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className='grid grid-cols-2 gap-4'>
              <div className='space-y-2'>
                <Label htmlFor='children'>{t("childrenLabel")}</Label>
                <Select value={formData.children} onValueChange={(value) => setFormData({ ...formData, children: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='20'>{t("childrenOption20")}</SelectItem>
                    <SelectItem value='25'>{t("childrenOption25")}</SelectItem>
                    <SelectItem value='30'>{t("childrenOption30")}</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className='space-y-2'>
                <Label htmlFor='drivers'>{t("driversLabel")}</Label>
                <Select value={formData.drivers} onValueChange={(value) => setFormData({ ...formData, drivers: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='8'>{t("driversOption8")}</SelectItem>
                    <SelectItem value='10'>{t("driversOption10")}</SelectItem>
                    <SelectItem value='15'>{t("driversOption15")}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </div>

        <div className='flex justify-end'>
          <Button onClick={handleSave} className='bg-blue-500 hover:bg-blue-600'>
            {t("doneButton")}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
