import { FullRideGroup } from "@/types/models"
import { create } from "zustand"
import { persist } from "zustand/middleware"

type RideGroupMergeStore = {
  selectedIds: number[]
  selected: FullRideGroup[]
  destinationId: number | undefined
  selectedDestination: FullRideGroup | undefined
  setSelectedIds: (ids: number[]) => void
  setSelected: (groups: FullRideGroup[]) => void
  setDestinationId: (id: number | undefined) => void
  setSelectedDestination: (group: FullRideGroup | undefined) => void
}

export const useRideGroupMergeStore = create<RideGroupMergeStore>()(
  persist(
    (set) => ({
      selectedIds: [],
      selected: [],
      destinationId: undefined,
      selectedDestination: undefined,
      setSelectedIds: (ids) => set(() => ({ selectedIds: ids })),
      setSelected: (groups) => set(() => ({ selected: groups })),
      setDestinationId: (id) => set(() => ({ destinationId: id })),
      setSelectedDestination: (group) => set(() => ({ selectedDestination: group }))
    }),
    {
      name: "ride-group-merge-storage",
      partialize: (state) => ({
        selectedIds: state.selectedIds,
        selected: state.selected,
        destinationId: state.destinationId,
        selectedDestination: state.selectedDestination
      })
    }
  )
)
