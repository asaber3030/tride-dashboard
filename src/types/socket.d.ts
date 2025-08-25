import { FullRideGroup, RideGroup } from "./models"

type TCheckpointType = "driver" | "child" | "school"
type TCheckpointStatus = "started" | "ended" | "active"
type TRideInstanceStatus = "started" | "ended" | "active"

type TAdminAckType = "ADMIN_JOIN_SUCCESS" | "ADMIN_JOIN_ERROR"

type TAdminWatchRides = {
  checkpointsOrder: {
    [key: number]: {
      id: number
      lat: number
      lng: number
      type: TCheckpointType
      status: TCheckpointStatus
      children?: number[]
    }
  }
  rideInstance: {
    driver_id: number
    ended_at: string | null
    group: FullRideGroup
    group_id: number
    id: number
    started_at: string
    status: TRideInstanceStatus
    type: string
  }
  driverLocation: {
    lat: number
    lng: number
    ts: string
  }
}

type TAdminWatchRide = {
  uid: string
  driverLocation: {
    lat: number
    lng: number
    ts: number
  }
  previousLocations: {
    id: number
    ride_instance_id: number
    lat: number
    lng: number
    created_at: Date
    updated_at: Date
  }
  checkpointOrder: {
    [key: string]: {
      id: number
      lat: number
      lng: number
      type: TCheckpointType
      status: tCheckpointStatus
      children?: number[]
    }
  }
}

type TDriverLocationUpdate = {
  locationMap: {
    lat: number
    lng: number
    ts: number
  }
  checkpointReached: null
}
