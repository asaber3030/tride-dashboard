"use client"

import { GOOGLE_MAPS_API_KEY } from "@/lib/constants"
import { useRideGroupTrackerStore } from "@/store/ride-group-store"
import { GoogleMap, LoadScript, Marker, Polyline } from "@react-google-maps/api"

type Props = {
  lat?: number
  lng?: number
}

export const RideGroupTrackerMap = ({ lat, lng }: Props) => {
  const { schoolCoordinates } = useRideGroupTrackerStore()

  const center = schoolCoordinates
  const containerStyle = {
    width: "100%",
    height: "100vh"
  }

  return (
    <div className='col-span-5'>
      <LoadScript googleMapsApiKey={GOOGLE_MAPS_API_KEY}>
        <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={12}>
          <Marker position={center} />
        </GoogleMap>
      </LoadScript>
    </div>
  )
}
