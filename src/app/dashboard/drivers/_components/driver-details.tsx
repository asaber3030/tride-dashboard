"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { useTranslations } from "next-intl"

interface DriverDocumentsProps {
  driverId: string
}

export function DriverDocuments({ driverId }: DriverDocumentsProps) {
  const [drugTestStatus, setDrugTestStatus] = useState(true)
  const [securityClearanceStatus, setSecurityClearanceStatus] = useState(true)
  const t = useTranslations()

  return (
    <div className='mx-auto space-y-8'>
      {/* Header */}
      <div className='flex items-center justify-between'>
        <h1 className='text-xl font-semibold text-black border-b mb-2'>{t("driverPersonalInformation")}</h1>
        <Button className='bg-blue-500 hover:bg-blue-600'>{t("exportButton")}</Button>
      </div>

      {/* Personal Information */}
      <div className='grid xl:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4'>
        <div>
          <h3 className='text-sm font-medium text-black mb-2'>{t("fullNameLabel")}</h3>
          <p className='text-gray-500 select-none text-sm border p-2 rounded-md cursor-not-allowed'>{t("fullName")}</p>
        </div>
        <div>
          <h3 className='text-sm font-medium text-black mb-2'>{t("phoneNumberLabel")}</h3>
          <p className='text-gray-500 select-none text-sm border p-2 rounded-md cursor-not-allowed'>01234567890</p>
        </div>
        <div>
          <h3 className='text-sm font-medium text-black mb-2'>{t("genderLabel")}</h3>
          <p className='text-gray-500 select-none text-sm border p-2 rounded-md cursor-not-allowed'>{t("gender")}</p>
        </div>
        <div>
          <h3 className='text-sm font-medium text-black mb-2'>{t("governorateLabel")}</h3>
          <p className='text-gray-500 select-none text-sm border p-2 rounded-md cursor-not-allowed'>{t("governorate")}</p>
        </div>
        <div>
          <h3 className='text-sm font-medium text-black mb-2'>{t("workAreaLabel")}</h3>
          <p className='text-gray-500 select-none text-sm border p-2 rounded-md cursor-not-allowed'>{t("workArea")}</p>
        </div>
      </div>

      {/* Vehicle Information and Drug Test */}
      <div className='grid xl:grid-cols-2 grid-cols-1 gap-8'>
        <div>
          <h2 className='text-lg font-semibold border-b mb-2'>{t("vehicleInformation")}</h2>
          <div className='grid grid-cols-2 gap-4'>
            <div>
              <h3 className='text-sm font-medium text-gray-600 mb-2'>{t("carModelLabel")}</h3>
              <p className='text-sm'>{t("carModel")}</p>
            </div>
            <div>
              <h3 className='text-sm font-medium text-gray-600 mb-2'>{t("modelYearLabel")}</h3>
              <p className='text-sm'>2020</p>
            </div>
          </div>
        </div>

        <div>
          <h2 className='text-lg font-semibold border-b mb-2'>{t("drugTest")}</h2>
          <div className='flex items-center justify-between'>
            <span className='text-sm font-medium text-gray-600'>{t("statusLabel")}</span>
            <div className='flex items-center gap-2'>
              <Switch checked={drugTestStatus} onCheckedChange={setDrugTestStatus} />
              <span className='text-sm'>{t("drugTestStatus")}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Driver License */}
      <div className='grid xl:grid-cols-2 grid-cols-1 gap-8'>
        <div>
          <h3 className='text-sm font-medium text-gray-600 border-b mb-2'>{t("driverLicenseImage")}</h3>
          <div className='w-32 h-20 bg-gray-100 rounded border overflow-hidden'>
            <img src='/placeholder.svg?height=80&width=128' alt={t("driverLicenseAlt")} className='w-full h-full object-cover' />
          </div>
        </div>
      </div>

      {/* Driver License Information and Security Clearance */}
      <div className='grid xl:grid-cols-2 grid-cols-1 gap-8'>
        <div>
          <h2 className='text-lg font-semibold border-b mb-2'>{t("driverLicenseInformation")}</h2>
          <div className='grid grid-cols-2 gap-4'>
            <div>
              <h3 className='text-sm font-medium text-gray-600 mb-2'>{t("licenseNumberLabel")}</h3>
              <p className='text-sm'>DL12345678</p>
            </div>
            <div>
              <h3 className='text-sm font-medium text-gray-600 mb-2'>{t("expiryDateLabel")}</h3>
              <p className='text-sm'>31/12/2027</p>
            </div>
          </div>
        </div>

        <div>
          <h2 className='text-lg font-semibold border-b mb-2'>{t("securityClearance")}</h2>
          <div className='flex items-center justify-between'>
            <span className='text-sm font-medium text-gray-600'>{t("statusLabel")}</span>
            <div className='flex items-center gap-2'>
              <Switch checked={securityClearanceStatus} onCheckedChange={setSecurityClearanceStatus} />
              <span className='text-sm'>{t("securityClearanceStatus")}</span>
            </div>
          </div>
        </div>
      </div>

      {/* National ID */}
      <div>
        <h2 className='text-lg font-semibold mb-4 border-b'>{t("nationalId")}</h2>
        <div className='flex flex-wrap gap-8'>
          <div>
            <h3 className='text-sm font-medium text-gray-600 mb-2'>{t("nationalIdFront")}</h3>
            <div className='w-44 h-32 bg-gray-100 rounded border overflow-hidden'>
              <img src='/placeholder.svg?height=80&width=128' alt={t("nationalIdFrontAlt")} className='w-full h-full object-cover' />
            </div>
          </div>
          <div>
            <h3 className='text-sm font-medium text-gray-600 mb-2'>{t("nationalIdBack")}</h3>
            <div className='w-44 h-32 bg-gray-100 rounded border overflow-hidden'>
              <img src='/placeholder.svg?height=80&width=128' alt={t("nationalIdBackAlt")} className='w-full h-full object-cover' />
            </div>
          </div>
        </div>
      </div>

      {/* Captain Face Poses */}
      <div>
        <h2 className='text-lg font-semibold border-b mb-2'>{t("captainFacePoses")}</h2>
        <div className='flex flex-wrap gap-4'>
          {["faceFront", "faceSide", "smile", "blink"].map((pose, index) => (
            <div key={index} className='text-left'>
              <h3 className='text-sm font-medium text-gray-600 mb-2'>{t(pose)}</h3>
              <div className='w-32 h-32 bg-gray-100 rounded-md border overflow-hidden mx-auto'>
                <img src='/placeholder.svg?height=80&width=80' alt={t(`${pose}Alt`)} className='w-full h-full object-cover' />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className='flex gap-4 pt-8'>
        <Button className='flex-1 bg-blue-500 hover:bg-blue-600 max-w-[200px]'>{t("acceptButton")}</Button>
        <Button variant='outline' className='flex-1 max-w-[200px] border-orange-500 text-orange-500 hover:bg-orange-50'>
          {t("rejectButton")}
        </Button>
      </div>
    </div>
  )
}
