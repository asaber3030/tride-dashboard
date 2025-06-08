"use client"

import { Checkbox } from "@/components/ui/checkbox"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Filter } from "lucide-react"

interface FilterSidebarProps {
  filters: any
  onFiltersChange: (filters: Partial<any>) => void
}

export default function FilterSidebar({ filters, onFiltersChange }: FilterSidebarProps) {
  const schools = [
    { id: "all", name: "All Schools" },
    { id: "cairo-international", name: "Cairo International School" },
    { id: "new-cairo-british", name: "New Cairo British School" },
    { id: "american-cairo", name: "American School of Cairo" },
    { id: "german-school", name: "German School Cairo" }
  ]

  const drivers = [
    { id: "all", name: "All Drivers" },
    { id: "ahmed-hassan", name: "Ahmed Hassan" },
    { id: "mohamed-ali", name: "Mohamed Ali" },
    { id: "sara-mahmoud", name: "Sara Mahmoud" },
    { id: "omar-farouk", name: "Omar Farouk" },
    { id: "fatima-nour", name: "Fatima Nour" }
  ]

  const handleTripFilterChange = (filter: keyof typeof filters.tripStatus) => {
    onFiltersChange({
      tripStatus: {
        ...filters.tripStatus,
        [filter]: !filters.tripStatus[filter]
      }
    })
  }

  return (
    <div className='w-80 bg-white border-r border-gray-200 p-6 overflow-y-auto'>
      <div className='flex items-center gap-2 mb-6'>
        <Filter className='w-5 h-5' />
        <h2 className='text-lg font-semibold'>Filters</h2>
      </div>

      {/* School Filter */}
      <div className='mb-6'>
        <label className='block text-sm font-medium text-gray-700 mb-2'>School</label>
        <Select value={filters.school} onValueChange={(value) => onFiltersChange({ school: value })}>
          <SelectTrigger className='w-full'>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {schools.map((school) => (
              <SelectItem key={school.id} value={school.id}>
                {school.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Driver Filter */}
      <div className='mb-6'>
        <label className='block text-sm font-medium text-gray-700 mb-2'>Driver</label>
        <Select value={filters.driver} onValueChange={(value) => onFiltersChange({ driver: value })}>
          <SelectTrigger className='w-full'>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {drivers.map((driver) => (
              <SelectItem key={driver.id} value={driver.id}>
                {driver.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Today's Trips */}
      <div className='mb-6'>
        <h3 className='text-sm font-medium text-gray-700 mb-3'>Today's Trips</h3>
        <div className='space-y-3'>
          <div className='flex items-center space-x-2'>
            <Checkbox id='on-the-way' checked={filters.tripStatus.onTheWay} onCheckedChange={() => handleTripFilterChange("onTheWay")} />
            <label htmlFor='on-the-way' className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'>
              On the way
            </label>
          </div>
          <div className='flex items-center space-x-2'>
            <Checkbox id='arrived' checked={filters.tripStatus.arrived} onCheckedChange={() => handleTripFilterChange("arrived")} />
            <label htmlFor='arrived' className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'>
              Arrived
            </label>
          </div>
          <div className='flex items-center space-x-2'>
            <Checkbox id='delayed' checked={filters.tripStatus.delayed} onCheckedChange={() => handleTripFilterChange("delayed")} />
            <label htmlFor='delayed' className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'>
              Delayed
            </label>
          </div>
        </div>
      </div>

      {/* Show only active trips toggle */}
      <div className='flex items-center justify-between'>
        <label htmlFor='active-trips' className='text-sm font-medium text-gray-700'>
          Show only active trips
        </label>
        <Switch id='active-trips' checked={filters.activeOnly} onCheckedChange={(checked) => onFiltersChange({ activeOnly: checked })} />
      </div>
    </div>
  )
}
