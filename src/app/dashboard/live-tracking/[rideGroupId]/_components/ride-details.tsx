"use client"

import { FullRideGroup } from "@/types/models"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import { ErrorLabel } from "@/components/common/error-label"

type Props = {
  rideGroup: FullRideGroup
}

export const RideDetailsForInstance = ({ rideGroup }: Props) => {
  return (
    <Card className='rounded-2xl shadow-md border bg-white'>
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
              <Image src={rideGroup.driver?.profile_pic || "/images/default-avatar.png"} alt={rideGroup.driver?.name || "Driver"} width={64} height={64} className='rounded-full object-cover border shadow-sm' />
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

        <hr />

        {/* School */}
        <section>
          <h3 className='text-base font-semibold mb-2 text-gray-700'>School</h3>
          <p className='font-medium'>{rideGroup.school?.school_name}</p>
          <p className='text-sm text-gray-500'>City ID: {rideGroup.school?.city_id}</p>
        </section>

        <hr />

        {/* Parents & Children */}
        <section>
          <h3 className='text-base font-semibold mb-2 text-gray-700'>Parents & Children</h3>
          <div className='space-y-4'>
            {rideGroup.parentGroups.map((pg) => (
              <div key={pg.id} className='border-b pb-3 last:border-0 last:pb-0'>
                <div className='flex items-center gap-3'>
                  <Image src={pg.parent?.profile_pic || "/images/default-avatar.png"} alt={pg.parent?.name || "Parent"} width={48} height={48} className='rounded-full border' />
                  <div>
                    <p className='font-medium'>{pg.parent?.name}</p>
                    <p className='text-sm text-gray-500'>{pg.parent?.phone}</p>
                    <p className='text-xs text-gray-400'>Seats: {pg.current_seats_taken}</p>
                  </div>
                </div>

                {/* Children */}
                <div className='ml-12 mt-2 space-y-1'>
                  {pg.childDetails.map((childDetail) => (
                    <div key={childDetail.id} className='flex items-center justify-between bg-gray-50 p-2 rounded-md'>
                      <span className='font-medium'>{childDetail.child.name}</span>
                      <span className='text-sm text-gray-500'>
                        {childDetail.child.grade} ({childDetail.child.gender})
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <hr />

        {/* Subscriptions */}
        <section>
          <h3 className='text-base font-semibold mb-2 text-gray-700'>Subscriptions</h3>
          <div className='grid gap-3'>
            {rideGroup.parent_group_subscription.map((sub) => (
              <div key={sub.id} className='flex justify-between items-center border p-3 rounded-md'>
                <div>
                  <p className='font-medium'>Parent ID: {sub.parent_id}</p>
                  <p className='text-sm text-gray-500'>Valid Until: {new Date(sub.valid_until).toLocaleDateString()}</p>
                </div>
                <Badge className={`px-2 py-1 rounded capitalize ${sub.status === "active" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>{sub.status}</Badge>
              </div>
            ))}
          </div>
        </section>
      </CardContent>
    </Card>
  )
}
