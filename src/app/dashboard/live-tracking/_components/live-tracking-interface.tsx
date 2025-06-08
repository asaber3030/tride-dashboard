"use client"

import { useState } from "react"
import FilterSidebar from "./filter"
import MapDisplay from "./map"

export interface MapFilters {
  school: string
  driver: string
  tripStatus: {
    onTheWay: boolean
    arrived: boolean
    delayed: boolean
  }
  activeOnly: boolean
}

export default function BusTrackingDashboard() {
  const [filters, setFilters] = useState<MapFilters>({
    school: "all",
    driver: "all",
    tripStatus: {
      onTheWay: true,
      arrived: true,
      delayed: true
    },
    activeOnly: false
  })

  const updateFilters = (newFilters: Partial<MapFilters>) => {
    setFilters((prev) => ({
      ...prev,
      ...newFilters
    }))
  }

  return (
    <div className='flex h-screen bg-gray-50'>
      <FilterSidebar filters={filters} onFiltersChange={updateFilters} />
      <MapDisplay filters={filters} />
    </div>
  )
}
