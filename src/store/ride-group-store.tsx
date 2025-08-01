import { DEFAULT_COORDINATES } from "@/lib/constants"
import { create } from "zustand"

type RideGroupStore = {
  schoolCoordinates: Coordinates
  rideGroupId: number | null
  groupType: TGroupType
  schoolId: number | null
  driverId: number | null
  setSchoolCoordinates: (coordinates: Coordinates) => void
  setRideGroupId: (id: number | null) => void
  setGroupType: (type: TGroupType) => void
  setSchoolId: (id: number | null) => void
  setDriverId: (id: number | null) => void
}

export const useRideGroupTrackerStore = create<RideGroupStore>((set) => ({
  schoolCoordinates: DEFAULT_COORDINATES,
  rideGroupId: null,
  groupType: "premium",
  schoolId: null,
  driverId: null,
  setSchoolCoordinates: (coordinates) => set(() => ({ schoolCoordinates: coordinates })),
  setRideGroupId: (id) => set(() => ({ rideGroupId: id })),
  setGroupType: (type) => set(() => ({ groupType: type })),
  setSchoolId: (id) => set(() => ({ schoolId: id })),
  setDriverId: (id) => set(() => ({ driverId: id }))
}))
