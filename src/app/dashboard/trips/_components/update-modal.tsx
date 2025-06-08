"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { X } from "lucide-react"

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
        location: "maadi",
        operatingHours: school.scheduledTime,
        status: school.status,
        contactPerson: "Omar Essam Gamal",
        phoneNumber: "01234567890",
        email: "@gmail.com",
        children: school.children.toString(),
        drivers: school.drivers.toString()
      })
    }
  }, [school])

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
            <DialogTitle className='text-lg font-medium'>Edit School</DialogTitle>
            <Button variant='ghost' size='icon' onClick={onClose}>
              <X className='h-4 w-4' />
            </Button>
          </div>
        </DialogHeader>

        <div className='grid grid-cols-2 gap-8 py-4'>
          {/* Basic Information */}
          <div className='space-y-4'>
            <h3 className='font-medium'>Basic Information</h3>

            <div className='space-y-2'>
              <Label htmlFor='school-name'>School name</Label>
              <Input id='school-name' value={formData.schoolName} onChange={(e) => setFormData({ ...formData, schoolName: e.target.value })} />
            </div>

            <div className='space-y-2'>
              <Label htmlFor='location'>Location</Label>
              <Input id='location' value={formData.location} onChange={(e) => setFormData({ ...formData, location: e.target.value })} />
            </div>

            <div className='space-y-2'>
              <Label htmlFor='operating-hours'>Operating Hours</Label>
              <Select value={formData.operatingHours} onValueChange={(value) => setFormData({ ...formData, operatingHours: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='7:00 am - 2:00 pm'>7:00 am - 2:00 pm</SelectItem>
                  <SelectItem value='8:00 am - 3:00 pm'>8:00 am - 3:00 pm</SelectItem>
                  <SelectItem value='9:00 am - 4:00 pm'>9:00 am - 4:00 pm</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className='space-y-2'>
              <Label htmlFor='status'>Status</Label>
              <Select value={formData.status} onValueChange={(value) => setFormData({ ...formData, status: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='active'>Active</SelectItem>
                  <SelectItem value='inactive'>Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Contact Information */}
          <div className='space-y-4'>
            <h3 className='font-medium'>Contact Information</h3>

            <div className='space-y-2'>
              <Label htmlFor='contact-person'>Contact Person</Label>
              <Input id='contact-person' value={formData.contactPerson} onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })} />
            </div>

            <div className='space-y-2'>
              <Label htmlFor='phone-number'>Phone Number</Label>
              <Input id='phone-number' value={formData.phoneNumber} onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })} />
            </div>

            <div className='space-y-2'>
              <Label htmlFor='email'>Email</Label>
              <Select value={formData.email} onValueChange={(value) => setFormData({ ...formData, email: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='@gmail.com'>@gmail.com</SelectItem>
                  <SelectItem value='@yahoo.com'>@yahoo.com</SelectItem>
                  <SelectItem value='@hotmail.com'>@hotmail.com</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className='grid grid-cols-2 gap-4'>
              <div className='space-y-2'>
                <Label htmlFor='children'>Children's</Label>
                <Select value={formData.children} onValueChange={(value) => setFormData({ ...formData, children: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='20'>20</SelectItem>
                    <SelectItem value='25'>25</SelectItem>
                    <SelectItem value='30'>30</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className='space-y-2'>
                <Label htmlFor='drivers'>Drivers</Label>
                <Select value={formData.drivers} onValueChange={(value) => setFormData({ ...formData, drivers: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='8'>8</SelectItem>
                    <SelectItem value='10'>10</SelectItem>
                    <SelectItem value='15'>15</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </div>

        <div className='flex justify-end'>
          <Button onClick={handleSave} className='bg-blue-500 hover:bg-blue-600'>
            Done
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
