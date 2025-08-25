"use client"

import Link from "next/link"

import { DEFAULT_COORDINATES } from "@/lib/constants"

import { GoogleMap, Marker } from "@react-google-maps/api"
import { MapWrapper } from "@/components/common/map-wrapper"
import { FullRideGroup } from "@/types/models"
import { useRouter } from "next/navigation"

export function LiveTrackingRideGroupsList({ rideGroups, sp }: { rideGroups: FullRideGroup[]; sp: TObject }) {
  const router = useRouter()

  const handleMarkerClick = (locationId: number) => {
    router.push(`/dashboard/live-tracking/${locationId}`)
  }

  return (
    <MapWrapper>
      <GoogleMap mapContainerStyle={{ width: "100%", height: "100vh" }} center={DEFAULT_COORDINATES} zoom={10}>
        {rideGroups?.map((location, idx) => (
          <Marker key={`marker-index_${idx}`} position={{ lat: Number(location.school.lat), lng: Number(location.school.lng) }} label={location.school.school_name} onClick={() => handleMarkerClick(location.id)} />
        ))}
      </GoogleMap>
    </MapWrapper>
  )
}
