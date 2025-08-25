"use client"

import { SingleRideGroupDetails } from "./single-ride"
import { FullRideGroup } from "@/types/models"

export function LiveTrackingRideGroupsList({ rideGroups, sp }: { rideGroups: FullRideGroup[]; sp: TObject }) {
  return (
    <section className='grid grid-cols-3 gap-3 flex-1'>
      {rideGroups.map((rd) => (
        <SingleRideGroupDetails key={rd.id} rideGroup={rd} />
      ))}
    </section>
  )
}
