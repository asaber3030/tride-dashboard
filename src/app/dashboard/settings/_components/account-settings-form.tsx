"use client"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Eye, EyeOff, Plus, User } from "lucide-react"
import { useTranslations } from "next-intl"

export function AccountSettingsForm() {
  const t = useTranslations()

  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [emails, setEmails] = useState([t("emailPlaceholder")])

  const addEmail = () => {
    setEmails([...emails, ""])
  }

  return (
    <div className='space-y-8 max-w-2xl'>
      {/* Profile Picture */}
      <div>
        <h3 className='text-sm font-medium mb-2'>{t("profilePictureLabel")}</h3>
        <div className='flex items-center justify-between'>
          <div className='flex items-center gap-4'>
            <Avatar className='h-20 w-20'>
              <AvatarImage src='/placeholder.svg' />
              <AvatarFallback>
                <User className='h-10 w-10' />
              </AvatarFallback>
            </Avatar>
            <div className='text-sm text-gray-500'>{t("imageFormat")}</div>
          </div>
          <div className='space-x-2'>
            <Button variant='outline' size='sm'>
              {t("uploadPictureButton")}
            </Button>
            <Button variant='outline' size='sm'>
              {t("deleteButton")}
            </Button>
          </div>
        </div>
      </div>

      {/* Name Fields */}
      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
        <div className='space-y-2'>
          <Label htmlFor='first-name'>{t("firstNameLabel")}</Label>
          <Input id='first-name' placeholder={t("firstNamePlaceholder")} />
        </div>
        <div className='space-y-2'>
          <Label htmlFor='last-name'>{t("lastNameLabel")}</Label>
          <Input id='last-name' placeholder={t("lastNamePlaceholder")} />
        </div>
      </div>

      {/* Email */}
      <div className='space-y-2'>
        <Label>{t("emailLabel")}</Label>
        <div className='space-y-2'>
          {emails.map((email, index) => (
            <Input
              key={index}
              value={email}
              onChange={(e) => {
                const newEmails = [...emails]
                newEmails[index] = e.target.value
                setEmails(newEmails)
              }}
            />
          ))}
        </div>
        <Button variant='outline' size='sm' className='mt-2 text-[#1890ff]' onClick={addEmail}>
          <Plus className='h-4 w-4 mr-1' /> {t("addEmailButton")}
        </Button>
      </div>

      {/* Admin Roles */}
      <div className='space-y-2'>
        <Label htmlFor='admin-role'>{t("adminRolesLabel")}</Label>
        <Select defaultValue='super-admin'>
          <SelectTrigger className='w-full'>
            <SelectValue placeholder={t("selectRolePlaceholder")} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='super-admin'>
              <div className='flex items-center gap-2'>
                <User className='h-4 w-4' />
                <span>{t("superAdminRole")}</span>
              </div>
            </SelectItem>
            <SelectItem value='operations-manager'>{t("operationsManagerRole")}</SelectItem>
            <SelectItem value='support-admin'>{t("supportAdminRole")}</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Password */}
      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
        <div className='space-y-2'>
          <Label htmlFor='current-password'>{t("currentPasswordLabel")}</Label>
          <div className='relative'>
            <Input id='current-password' type={showCurrentPassword ? "text" : "password"} placeholder={t("passwordPlaceholder")} />
            <Button
              type='button'
              variant='ghost'
              size='sm'
              className='absolute right-0 top-0 h-full px-

3'
              onClick={() => setShowCurrentPassword(!showCurrentPassword)}
            >
              {showCurrentPassword ? <EyeOff className='h-4 w-4 text-gray-500' /> : <Eye className='h-4 w-4 text-gray-500' />}
            </Button>
          </div>
        </div>
        <div className='space-y-2'>
          <Label htmlFor='new-password'>{t("newPasswordLabel")}</Label>
          <div className='relative'>
            <Input id='new-password' type={showNewPassword ? "text" : "password"} placeholder={t("passwordPlaceholder")} />
            <Button type='button' variant='ghost' size='sm' className='absolute right-0 top-0 h-full px-3' onClick={() => setShowNewPassword(!showNewPassword)}>
              {showNewPassword ? <EyeOff className='h-4 w-4 text-gray-500' /> : <Eye className='h-4 w-4 text-gray-500' />}
            </Button>
          </div>
        </div>
      </div>

      {/* Language */}
      <div className='space-y-2'>
        <Label htmlFor='language'>{t("languageLabel")}</Label>
        <Select defaultValue='english'>
          <SelectTrigger className='w-full'>
            <SelectValue placeholder={t("selectLanguagePlaceholder")} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='english'>{t("languageEnglish")}</SelectItem>
            <SelectItem value='spanish'>{t("languageSpanish")}</SelectItem>
            <SelectItem value='french'>{t("languageFrench")}</SelectItem>
            <SelectItem value='german'>{t("languageGerman")}</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Submit Button */}
      <div>
        <Button className='bg-[#1890ff] hover:bg-[#40a9ff]'>{t("editButton")}</Button>
      </div>
    </div>
  )
}
