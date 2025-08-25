"use client"

import { MapWrapper } from "@/components/common/map-wrapper"
import { DEFAULT_COORDINATES } from "@/lib/constants"
import { InstanceLocation } from "@/types/models"
import { GoogleMap, Marker, Polyline } from "@react-google-maps/api"

type Props = {
  locations: InstanceLocation[]
}

export const InstanceLocationsHistory = ({ locations }: Props) => {
  if (locations.length === 0) return <p>No Locations Found</p>
  return (
    <MapWrapper>
      <GoogleMap center={{ lat: locations[0].lat, lng: locations[0].lng }} zoom={12} mapContainerStyle={{ width: "100%", height: "100vh" }}>
        <Polyline
          path={locations.map((loc) => ({
            lat: loc.lat,
            lng: loc.lng
          }))}
          options={{
            strokeColor: "#4285F4",
            strokeOpacity: 0.8,
            strokeWeight: 4
          }}
        />

        {locations.map((location) => (
          <Marker key={`location-marker-${location.id}`} position={{ lat: location.lat, lng: location.lng }} label={`Timestamp: ${new Date(location.created_at).toLocaleString()}`} />
        ))}
      </GoogleMap>
    </MapWrapper>
  )
}
