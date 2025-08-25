"use client"

import { SimplePagination } from "@/components/common/simple-pagination"
import routes from "@/lib/routes"
import { RideGroupInstance } from "@/types/models"
import { useTranslations } from "next-intl"
import Link from "next/link"

type Props = {
  instances: RideGroupInstance[]
  hasNextPage: boolean
  hasPrevPage: boolean
}

export const RideGroupInstancesList = ({ instances, hasNextPage, hasPrevPage }: Props) => {
  const t = useTranslations()

  if (instances.length === 0) return <p className='text-gray-500 text-xl'>{t("noInstancesAvailableForRideGroup")}</p>

  return (
    <div className='mt-6'>
      <div className='space-y-6'>
        <ul className='grid grid-cols-4 gap-2 items-center'>
          {instances.map((instance) => (
            <li key={instance.id} className='p-4 border-b bg-white rounded-md border hover:bg-gray-50 w-full'>
              <Link href={routes.liveTracking.instanceLocations(instance.group_id, instance.id)}>
                <div className='flex justify-between items-center w-full'>
                  <b>{t("from")}:</b> {new Date(instance.started_at).toUTCString()}
                </div>
                {instance.ended_at && (
                  <div className='flex justify-between items-center w-full'>
                    <b>{t("to")}:</b> {new Date(instance.ended_at).toUTCString()}
                  </div>
                )}
                <span className='text-sm text-gray-400'>{t("viewDetails")}</span>
              </Link>
            </li>
          ))}
        </ul>
        <SimplePagination hasNextPage={hasNextPage!} hasPrevPage={hasPrevPage!} />
      </div>
    </div>
  )
}
