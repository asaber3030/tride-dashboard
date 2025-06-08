"use client"

import { useState, useMemo } from "react"
import Image from "next/image"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface Bus {
  id: string
  school: string
  driver: string
  status: "on-the-way" | "arrived" | "delayed"
  position: { x: number; y: number } // Percentage positions on the image
  route: string
  students: number
  nextStop: string
}

interface MapDisplayProps {
  filters: any
}

const mockBusData: Bus[] = [
  {
    id: "bus-001",
    school: "cairo-international",
    driver: "ahmed-hassan",
    status: "on-the-way",
    position: { x: 45, y: 35 },
    route: "Route A",
    students: 25,
    nextStop: "Hadaiq el Qubbah"
  },
  {
    id: "bus-002",
    school: "new-cairo-british",
    driver: "mohamed-ali",
    status: "arrived",
    position: { x: 65, y: 45 },
    route: "Route B",
    students: 18,
    nextStop: "School"
  },
  {
    id: "bus-003",
    school: "american-cairo",
    driver: "sara-mahmoud",
    status: "delayed",
    position: { x: 35, y: 55 },
    route: "Route C",
    students: 22,
    nextStop: "El Dimirdash"
  },
  {
    id: "bus-004",
    school: "german-school",
    driver: "omar-farouk",
    status: "on-the-way",
    position: { x: 55, y: 25 },
    route: "Route D",
    students: 20,
    nextStop: "Imbaba"
  },
  {
    id: "bus-005",
    school: "cairo-international",
    driver: "fatima-nour",
    status: "on-the-way",
    position: { x: 25, y: 45 },
    route: "Route E",
    students: 16,
    nextStop: "Meet Okba"
  }
]

export default function MapDisplay({ filters }: MapDisplayProps) {
  const [selectedBus, setSelectedBus] = useState<Bus | null>(null)

  const filteredBuses = useMemo(() => {
    return mockBusData.filter((bus) => {
      if (filters.school !== "all" && bus.school !== filters.school) return false

      if (filters.driver !== "all" && bus.driver !== filters.driver) return false

      if (bus.status === "on-the-way" && !filters.tripStatus.onTheWay) return false
      if (bus.status === "arrived" && !filters.tripStatus.arrived) return false
      if (bus.status === "delayed" && !filters.tripStatus.delayed) return false

      if (filters.activeOnly && bus.status === "arrived") return false

      return true
    })
  }, [filters])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "on-the-way":
        return "bg-blue-500 hover:bg-blue-600"
      case "arrived":
        return "bg-green-500 hover:bg-green-600"
      case "delayed":
        return "bg-red-500 hover:bg-red-600"
      default:
        return "bg-gray-500 hover:bg-gray-600"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "on-the-way":
        return "On the way"
      case "arrived":
        return "Arrived"
      case "delayed":
        return "Delayed"
      default:
        return status
    }
  }

  const getDriverName = (driverId: string) => {
    const driverNames: Record<string, string> = {
      "ahmed-hassan": "Ahmed Hassan",
      "mohamed-ali": "Mohamed Ali",
      "sara-mahmoud": "Sara Mahmoud",
      "omar-farouk": "Omar Farouk",
      "fatima-nour": "Fatima Nour"
    }
    return driverNames[driverId] || driverId
  }

  const getSchoolName = (schoolId: string) => {
    const schoolNames: Record<string, string> = {
      "cairo-international": "Cairo International School",
      "new-cairo-british": "New Cairo British School",
      "american-cairo": "American School of Cairo",
      "german-school": "German School Cairo"
    }
    return schoolNames[schoolId] || schoolId
  }

  return (
    <div className='flex-1 relative bg-gray-100'>
      {/* Map Container */}
      <div className='relative w-full h-full overflow-hidden'>
        <Image src='/defaults/images/placeholder.jpg' alt='Cairo Map' fill className='object-cover' priority />

        {/* Bus Markers */}
        {filteredBuses.map((bus) => (
          <button
            key={bus.id}
            className={`absolute w-10 h-10 rounded-full ${getStatusColor(bus.status)} 
                       flex items-center justify-center text-white text-lg font-bold
                       transform -translate-x-1/2 -translate-y-1/2 cursor-pointer
                       transition-all duration-200 hover:scale-110 shadow-lg
                       border-2 border-white z-10`}
            style={{
              left: `${bus.position.x}%`,
              top: `${bus.position.y}%`
            }}
            onClick={() => setSelectedBus(bus)}
            title={`${bus.route} - ${getStatusText(bus.status)}`}
          >
            🚌
          </button>
        ))}
      </div>

      {/* Bus Details Panel */}
      {selectedBus && (
        <Card className='absolute top-4 right-4 w-80 p-4 bg-white shadow-lg z-20'>
          <div className='flex justify-between items-start mb-3'>
            <h3 className='font-semibold text-lg'>{selectedBus.route}</h3>
            <button onClick={() => setSelectedBus(null)} className='text-gray-400 hover:text-gray-600 text-xl leading-none'>
              ×
            </button>
          </div>

          <div className='space-y-3'>
            <div className='flex items-center gap-2'>
              <Badge className={`${getStatusColor(selectedBus.status)} text-white`}>{getStatusText(selectedBus.status)}</Badge>
            </div>

            <div className='text-sm text-gray-600 space-y-1'>
              <p>
                <strong>School:</strong> {getSchoolName(selectedBus.school)}
              </p>
              <p>
                <strong>Driver:</strong> {getDriverName(selectedBus.driver)}
              </p>
              <p>
                <strong>Students:</strong> {selectedBus.students}
              </p>
              <p>
                <strong>Next Stop:</strong> {selectedBus.nextStop}
              </p>
            </div>
          </div>
        </Card>
      )}

      {/* Legend */}
      <Card className='absolute bottom-4 left-4 p-3 bg-white shadow-lg z-20'>
        <h4 className='font-semibold mb-2 text-sm'>Legend</h4>
        <div className='space-y-2 text-xs'>
          <div className='flex items-center gap-2'>
            <div className='w-4 h-4 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs'>🚌</div>
            <span>On the way</span>
          </div>
          <div className='flex items-center gap-2'>
            <div className='w-4 h-4 rounded-full bg-green-500 flex items-center justify-center text-white text-xs'>🚌</div>
            <span>Arrived</span>
          </div>
          <div className='flex items-center gap-2'>
            <div className='w-4 h-4 rounded-full bg-red-500 flex items-center justify-center text-white text-xs'>🚌</div>
            <span>Delayed</span>
          </div>
        </div>
      </Card>

      {/* Stats Panel */}
      <Card className='absolute top-4 left-4 p-3 bg-white shadow-lg z-20'>
        <h4 className='font-semibold mb-2 text-sm'>Active Buses</h4>
        <div className='text-2xl font-bold text-blue-600'>{filteredBuses.length}</div>
        <div className='text-xs text-gray-500 space-y-1'>
          <div>{filteredBuses.filter((b) => b.status === "on-the-way").length} on route</div>
          <div>{filteredBuses.filter((b) => b.status === "arrived").length} arrived</div>
          <div>{filteredBuses.filter((b) => b.status === "delayed").length} delayed</div>
        </div>
      </Card>
    </div>
  )
}
