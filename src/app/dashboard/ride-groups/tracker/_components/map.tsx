"use client"

import { useRideGroupTrackerStore } from "@/store/ride-group-store"
import { useRideGroupLocations } from "../../_helpers/hooks"

import { GOOGLE_MAPS_API_KEY } from "@/lib/constants"

import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api"
import { RideGroupLocation } from "@/types/models"

export const RideGroupTrackerMap = () => {
  const { schoolCoordinates, rideGroupId } = useRideGroupTrackerStore()
  const { data } = useRideGroupLocations(rideGroupId!)

  const center = schoolCoordinates
  const containerStyle = {
    width: "100%",
    height: "100vh"
  }

  const parentLocations =
    data?.flatMap((location: RideGroupLocation) =>
      location.parentGroups.map((group) => ({
        lat: parseFloat(`${group.home_lat}`),
        lng: parseFloat(`${group.home_lng}`),
        name: group.parent.name
      }))
    ) || []

  return (
    <div className='col-span-5'>
      <LoadScript googleMapsApiKey={GOOGLE_MAPS_API_KEY}>
        <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={8}>
          <Marker position={center} label='School' />
          {parentLocations.map((location, index) => (
            <Marker
              key={`marker_index_${index}`}
              position={{ lat: location.lat, lng: location.lng }}
              label={{
                text: location.name,
                color: "black",
                fontSize: "25px"
              }}
              icon={{
                path: google.maps.SymbolPath.CIRCLE,
                scale: 18,
                fillColor: "#EEE432",
                fillOpacity: 1,
                strokeWeight: 1,
                strokeColor: "#333"
              }}
            />
          ))}
        </GoogleMap>
      </LoadScript>
    </div>
  )
}
