"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { useTranslations } from "next-intl"
import { useDriver } from "../_helpers/hooks"
import { DisplayError } from "@/components/common/error"
import { diffForHumans } from "@/lib/utils"

interface DriverDocumentsProps {
  driverId: number
}

export function DriverDocuments({ driverId }: DriverDocumentsProps) {
  const t = useTranslations()

  const { data: driver, isLoading, isError, error } = useDriver(driverId)

  if (isLoading) return "Loading..."
  if (isError) return <DisplayError error={error} />
  if (!driver) return "No driver found"

  return (
    <div className='mx-auto space-y-8'>
      {/* Header */}
      <div className='flex items-center justify-between'>
        <h1 className='text-xl font-semibold text-black border-b mb-2'>{t("driverPersonalInformation")}</h1>
      </div>

      {/* Personal Information */}
      <div className='grid xl:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4'>
        <div>
          <h3 className='text-sm font-medium text-black mb-2'>{t("fullNameLabel")}</h3>
          <p className='text-gray-500 select-none text-sm border p-2 rounded-md cursor-not-allowed'>{driver.name}</p>
        </div>
        <div>
          <h3 className='text-sm font-medium text-black mb-2'>{t("phoneNumberLabel")}</h3>
          <p className='text-gray-500 select-none text-sm border p-2 rounded-md cursor-not-allowed'>{driver.phone}</p>
        </div>
        <div>
          <h3 className='text-sm font-medium text-black mb-2'>{t("genderLabel")}</h3>
          <p className='text-gray-500 select-none text-sm border p-2 rounded-md cursor-not-allowed'>{driver.gender}</p>
        </div>
        <div>
          <h3 className='text-sm font-medium text-black mb-2'>{t("joined")}</h3>
          <p className='text-gray-500 select-none text-sm border p-2 rounded-md cursor-not-allowed'>{diffForHumans(new Date(driver.created_at))}</p>
        </div>
        <div>
          <h3 className='text-sm font-medium text-black mb-2'>{t("address")}</h3>
          <p className='text-gray-500 select-none text-sm border p-2 rounded-md cursor-not-allowed'>{driver.formatted_address}</p>
        </div>
      </div>

      {/* Vehicle Information and Drug Test */}
      {driver?.papers && (
        <div className='grid xl:grid-cols-2 grid-cols-1 gap-8'>
          <div>
            <h2 className='text-lg font-semibold border-b mb-2'>{t("vehicleInformation")}</h2>
            <div className='grid grid-cols-2 gap-4'>
              <div>
                <h3 className='text-sm font-medium text-gray-600 mb-2'>{t("carModelLabel")}</h3>
                <p className='text-sm'>{driver?.papers.car_model}</p>
              </div>
              <div>
                <h3 className='text-sm font-medium text-gray-600 mb-2'>{t("modelYearLabel")}</h3>
                <p className='text-sm'>{driver?.papers.car_model_year}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Driver License */}
      <div className='grid xl:grid-cols-2 grid-cols-1 gap-8'>
        <div>
          <h3 className='text-sm font-medium text-gray-600 border-b mb-2'>{t("driverLicenseImage")}</h3>
          <div className='w-32 h-20 bg-gray-100 rounded border overflow-hidden'>
            <img src={driver?.papers?.driver_license_url || "/placeholder.svg?height=80&width=128"} alt={t("driverLicenseAlt")} className='w-full h-full object-cover' />
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
              <p className='text-sm'>{driver?.license_number}</p>
            </div>
            <div>
              <h3 className='text-sm font-medium text-gray-600 mb-2'>{t("expiryDateLabel")}</h3>
              <p className='text-sm'>{driver?.papers?.driver_license_exp_date?.toString()}</p>
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
              <img src={driver?.papers?.front_side_national_url || "/placeholder.svg?height=80&width=128"} alt={t("nationalIdFrontAlt")} className='w-full h-full object-cover' />
            </div>
          </div>
          <div>
            <h3 className='text-sm font-medium text-gray-600 mb-2'>{t("nationalIdBack")}</h3>
            <div className='w-44 h-32 bg-gray-100 rounded border overflow-hidden'>
              <img src={driver?.papers?.back_side_national_url || "/placeholder.svg?height=80&width=128"} alt={t("nationalIdBackAlt")} className='w-full h-full object-cover' />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
