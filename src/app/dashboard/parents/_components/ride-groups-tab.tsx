"use client"

import { useState } from "react"
import { useTranslations } from "next-intl"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Users, Calendar, Car, GraduationCap, Eye, XIcon } from "lucide-react"
import { FullRideGroup } from "@/types/models"
import { RideGroupModal } from "./ride-group-modal"
import { RideGroupsTabLoader } from "./loaders/ride-groups-tab"

type Props = {
  rideGroups: FullRideGroup[] | undefined
  isLoading: boolean
  count?: number
  hasNextPage?: boolean
  hasPreviousPage?: boolean
}

export function RideGroupsTab({ rideGroups, isLoading }: Props) {
  const t = useTranslations()
  const [selectedGroup, setSelectedGroup] = useState<FullRideGroup | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleViewDetails = (group: FullRideGroup) => {
    setSelectedGroup(group)
    setIsModalOpen(true)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString()
  }

  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case "active":
        return "default"
      case "inactive":
        return "secondary"
      case "pending":
        return "outline"
      default:
        return "secondary"
    }
  }

  if (rideGroups?.length === 0) {
    return (
      <Card>
        <CardContent className='flex flex-col items-center justify-center py-12'>
          <Car className='h-12 w-12 text-muted-foreground mb-4' />
          <h3 className='text-lg font-semibold mb-2'>{t("parentDetails.rideGroups.noGroups")}</h3>
          <p className='text-muted-foreground text-center'>{t("parentDetails.rideGroups.noGroupsDescription")}</p>
        </CardContent>
      </Card>
    )
  }

  if (isLoading) return <RideGroupsTabLoader />
  if (!rideGroups) return "Loading..."

  return (
    <>
      <div className='space-y-4'>
        <div className='flex items-center gap-2 mb-6'>
          <Car className='h-5 w-5' />
          <h2 className='text-xl font-semibold'>
            {t("parentDetails.rideGroups.title")} ({rideGroups.length})
          </h2>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
          {rideGroups.map((group) => (
            <Card key={group?.id} className='hover:shadow-md transition-shadow'>
              <CardHeader className='pb-3'>
                <div className='flex items-start justify-between'>
                  <CardTitle className='text-lg line-clamp-2'>{group?.group_name}</CardTitle>
                  <Badge variant={getStatusColor(group?.status)}>{group?.status}</Badge>
                </div>
              </CardHeader>

              <CardContent className='space-y-4'>
                {/* School Info */}
                <div className='flex items-center gap-2'>
                  <GraduationCap className='h-4 w-4 text-muted-foreground' />
                  <span className='text-sm font-medium'>{group?.school?.school_name}</span>
                </div>

                {/* Driver Info */}
                {group?.driver ? (
                  <div className='flex items-center gap-2'>
                    <Avatar className='h-6 w-6'>
                      <AvatarImage src={group?.driver?.profile_pic || "/placeholder.svg"} alt={group?.driver?.name} />
                      <AvatarFallback className='text-xs'>
                        {group?.driver?.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")
                          .toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <span className='text-sm'>{group?.driver?.name}</span>
                  </div>
                ) : (
                  <div className='flex items-center gap-2'>
                    <span className='text-sm text-red-500 flex gap-2 items-center'>
                      <XIcon className='size-4' /> {t("parentDetails.rideGroups.noDriver")}
                    </span>
                  </div>
                )}

                {/* Seats Info */}
                <div className='flex items-center gap-2'>
                  <Users className='h-4 w-4 text-muted-foreground' />
                  <span className='text-sm'>
                    {group?.current_seats_taken} {t("parentDetails.rideGroups.seatsTaken")}
                  </span>
                </div>

                {/* Created Date */}
                <div className='flex items-center gap-2'>
                  <Calendar className='h-4 w-4 text-muted-foreground' />
                  <span className='text-sm text-muted-foreground'>{formatDate(group?.created_at)}</span>
                </div>

                {/* Group Type */}
                <div className='flex items-center justify-between'>
                  <Badge variant='outline'>{group?.group_type}</Badge>
                  <Button size='sm' variant='outline' onClick={() => handleViewDetails(group)} className='flex items-center gap-1'>
                    <Eye className='h-3 w-3' />
                    {t("parentDetails.rideGroups.viewDetails")}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {selectedGroup && (
        <RideGroupModal
          rideGroup={selectedGroup}
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false)
            setSelectedGroup(null)
          }}
        />
      )}
    </>
  )
}
