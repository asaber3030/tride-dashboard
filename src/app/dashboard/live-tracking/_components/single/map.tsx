"use client"

import { useCallback, useEffect, useState } from "react"
import { useSocketContext } from "@/providers/ws.provider"
import { DEFAULT_COORDINATES } from "@/lib/constants"

import { TDriverLocationUpdate, TAdminWatchRide, TAdminAckType, TCheckpointType, TCheckpointStatus } from "@/types/socket"
import { GoogleMap, Marker, DirectionsRenderer } from "@react-google-maps/api"
import { FullRideGroup } from "@/types/models"
import { ErrorLabel } from "@/components/common/error-label"
import { MapWrapper } from "@/components/common/map-wrapper"
import { MapIcons } from "@/lib/lists"

type Props = {
  rideId: string
  group: FullRideGroup
}

export const SingleRideGroupTrackingMap = ({ rideId, group }: Props) => {
  const schoolPosition = { lat: Number(group.school.lat), lng: Number(group.school.lng) }

  const { socket } = useSocketContext()

  const [hadError, setHadError] = useState({
    has: false,
    message: ""
  })
  const [ackData, setAckData] = useState<TAdminWatchRide>()
  const [driverPosition, setDriverPosition] = useState<{ lat: number; lng: number }>()
  const [checkpoints, setCheckpoints] = useState<
    {
      id: number
      lat: number
      lng: number
      type: TCheckpointType
      status: TCheckpointStatus
      children?: number[]
    }[]
  >()
  const [directions, setDirections] = useState<google.maps.DirectionsResult | null>(null)

  const joinRideRoom = () => {
    console.log(`🔌 Emitting admin_watch_ride for group ${group.id}`)
    socket?.emit("admin_watch_ride", `{ "ride_group_id": ${group.id} }`)
  }

  const onLocationUpdate = useCallback((location: SocketAck<TDriverLocationUpdate, "LOCATION_UPDATE">) => {
    console.log("📍 Location Update Received:", location.data)
    setDriverPosition(location.data.locationMap)
  }, [])

  const onAck = useCallback((data: SocketAck<TAdminWatchRide, TAdminAckType>) => {
    console.log("✅ Ack Received:", data)
    if (data.type === "ADMIN_JOIN_SUCCESS") {
      setAckData(data.data)
      setDriverPosition(data.data.driverLocation)
      if (data.data.checkpointOrder) {
        setCheckpoints(Object.values(data.data.checkpointOrder))
      }
    } else {
      setHadError({
        has: true,
        message: data.message
      })
    }
  }, [])

  const onError = useCallback((err: any) => {
    console.error("❌ Socket error:", err.message || err)
  }, [])

  useEffect(() => {
    if (!socket) return

    socket.on("connect", joinRideRoom)
    socket.on("connect_error", onError)
    socket.on("ack", onAck)
    socket.on("location_update", onLocationUpdate)

    if (socket.connected) {
      joinRideRoom()
    }

    return () => {
      console.log(`🧹 Cleaning up socket listeners for group ${group.id}`)
      socket.off("connect", joinRideRoom)
      socket.off("connect_error", onError)
      socket.off("ack", onAck)
      socket.off("location_update", onLocationUpdate)
    }
  }, [socket, rideId, onAck, onError, onLocationUpdate])

  useEffect(() => {
    if (!driverPosition || !checkpoints || checkpoints.length === 0) {
      setDirections(null)
      return
    }

    const waypoints = checkpoints.map((cp) => ({
      location: { lat: cp.lat, lng: cp.lng },
      stopover: true
    }))

    const directionsService = new google.maps.DirectionsService()

    directionsService.route(
      {
        origin: driverPosition,
        destination: schoolPosition,
        waypoints: waypoints,
        travelMode: google.maps.TravelMode.DRIVING
      },
      (result, status) => {
        if (status === google.maps.DirectionsStatus.OK && result) {
          setDirections(result)
        } else {
          console.error(`Could not display directions due to: ${status}`)
        }
      }
    )
  }, [driverPosition, checkpoints, schoolPosition])

  if (hadError.has) {
    return (
      <div className='px-2 w-full h-screen items-center flex justify-center'>
        <ErrorLabel>{hadError.message}</ErrorLabel>
      </div>
    )
  }

  if (group.driver === null)
    return (
      <div className='px-2 w-full h-screen items-center flex justify-center'>
        <ErrorLabel>Driver not assigned to this group. Waiting for driver to be assigned </ErrorLabel>
      </div>
    )

  return (
    <MapWrapper>
      <GoogleMap center={driverPosition || schoolPosition || DEFAULT_COORDINATES} mapContainerStyle={{ width: "100%", height: "100vh" }} zoom={8}>
        {directions && <DirectionsRenderer directions={directions} options={{ polylineOptions: { strokeColor: "blue", strokeWeight: 5 } }} />}

        {driverPosition && (
          <Marker
            icon={{
              url: MapIcons.driver,
              scaledSize: { width: 60, height: 60 } as any
            }}
            position={driverPosition}
            label={group.driver.name}
          />
        )}

        {checkpoints?.map((checkpoint, idx) => (
          <Marker
            key={`checkpoint_${checkpoint.id}_${idx}`}
            position={{ lat: checkpoint.lat, lng: checkpoint.lng }}
            icon={{
              url: MapIcons.checkpoint,
              scaledSize: { width: 30, height: 30 } as any
            }}
            label={{
              text: checkpoint.type,
              color: "blue",
              fontWeight: "bold",
              fontSize: "16px"
            }}
          />
        ))}

        <Marker
          icon={{
            url: MapIcons.school,
            scaledSize: { width: 60, height: 60 } as any
          }}
          position={schoolPosition}
          label={group.school.school_name}
        />
      </GoogleMap>
    </MapWrapper>
  )
}
