"use client"

import Image from "next/image"
import routes from "@/lib/routes"

import { FullRideGroup } from "@/types/models"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ErrorLabel } from "@/components/common/error-label"
import { LinkBtn } from "@/components/common/link-button"
import { DotIcon } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function SingleRideGroupDetails({ rideGroup }: { rideGroup: FullRideGroup }) {
  return (
    <Card className='rounded-2xl shadow-md border bg-white h-fit'>
      <CardHeader className='flex items-center justify-between'>
        <CardTitle className='text-xl font-semibold'>{rideGroup.group_name}</CardTitle>
        <Badge className={`px-3 py-1 rounded-full capitalize ${rideGroup.status === "active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}`}>{rideGroup.status}</Badge>
      </CardHeader>

      <CardContent className='space-y-6'>
        {/* Group Overview */}
        <section>
          <h3 className='text-base font-semibold mb-2 text-gray-700'>Group Overview</h3>
          <div className='grid grid-cols-2 gap-4 text-sm'>
            <div>
              <span className='block text-gray-500 font-medium'>Group ID</span>
              <span>{rideGroup.id}</span>
            </div>
            <div>
              <span className='block text-gray-500 font-medium'>Invite Code</span>
              <span>{rideGroup.invite_code}</span>
            </div>
            <div>
              <span className='block text-gray-500 font-medium'>Seats Taken</span>
              <span>{rideGroup.current_seats_taken}</span>
            </div>
            <div>
              <span className='block text-gray-500 font-medium'>Group Type</span>
              <span className='capitalize'>{rideGroup.group_type}</span>
            </div>
          </div>
        </section>

        <hr />

        {rideGroup?.driver ? (
          <section>
            <h3 className='text-base font-semibold mb-2 text-gray-700'>Driver</h3>
            <div className='flex items-center gap-4'>
              <Avatar className='size-12'>
                <AvatarFallback>{rideGroup.driver?.name[0]}</AvatarFallback>
                <AvatarImage src={rideGroup.driver?.profile_pic} alt={rideGroup.driver?.name} />
              </Avatar>
              <div>
                <p className='font-medium'>{rideGroup.driver?.name}</p>
                <p className='text-sm text-gray-500'>{rideGroup.driver?.phone}</p>
                <p className='text-xs text-gray-400'>License: {rideGroup.driver?.license_number}</p>
              </div>
            </div>
          </section>
        ) : (
          <ErrorLabel>No driver assigned</ErrorLabel>
        )}

        {rideGroup.driver && (
          <LinkBtn variant='outline' href={routes.liveTracking.single(rideGroup.id)} className='w-full' icon={DotIcon}>
            Live Track
          </LinkBtn>
        )}
      </CardContent>
    </Card>
  )
}
