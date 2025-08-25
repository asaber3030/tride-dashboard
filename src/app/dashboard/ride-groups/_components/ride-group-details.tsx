"use client"

import { useRideGroup } from "../_helpers/hooks"

import { Users, MapPin, Phone, Calendar, Clock, CreditCard, School, Car, UserCheck, Baby, Timer, CheckCircle, XCircle, CopyIcon, MapIcon } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { RideGroupLoading } from "./ride-group-details-loader"
import { DisplayError } from "@/components/common/error"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { capitalize } from "@/lib/utils"
import { useTranslations } from "next-intl"

interface RideGroupProps {
  rideGroupId: number
}

export function RideGroupDetails({ rideGroupId }: RideGroupProps) {
  const t = useTranslations()
  const { data: rideGroup, isLoading, error, isError } = useRideGroup(rideGroupId)

  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case "active":
        return "bg-green-100 text-green-800 border-green-200"
      case "inactive":
        return "bg-red-100 text-red-800 border-red-200"
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString)?.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric"
    })
  }

  const formatTime = (timeString: string) => {
    return new Date(`2000-01-01T${timeString}`)?.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true
    })
  }

  if (isLoading) return <RideGroupLoading />
  if (!rideGroup) return <div className='p-6 text-center text-gray-500'>Loading ride group details...</div>
  if (isError) return <DisplayError error={error} />

  return (
    <div className='mx-auto space-y-6'>
      <Card className='border-2'>
        <CardHeader className='pb-4'>
          <div className='flex items-center justify-between'>
            <div className='space-y-2'>
              <CardTitle className='text-2xl font-bold text-gray-900'>{rideGroup?.group_name}</CardTitle>
              <div className='flex items-center gap-4'>
                <Badge variant='outline' className='text-sm'>
                  {capitalize(rideGroup?.group_type)}
                </Badge>
              </div>
            </div>
            <div className='text-right'>
              <div className='flex items-center gap-2 text-lg font-semibold'>
                <Users className='w-5 h-5' />
                {t("seatsTaken", { number: rideGroup?.current_seats_taken })}
              </div>
              <p className='text-sm text-gray-500'>{t("createdAt", { date: formatDate(rideGroup?.created_at) })}</p>
            </div>
          </div>
        </CardHeader>
      </Card>

      <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
        <Card>
          <CardHeader>
            <CardTitle className='flex items-center gap-2'>
              <Car className='w-5 h-5' />
              {t("driverInformation")}
            </CardTitle>
          </CardHeader>
          <CardContent className='space-y-4'>
            <div className='flex items-center gap-4'>
              <Avatar className='w-16 h-16'>
                <AvatarImage src={rideGroup?.driver?.profile_pic || "/placeholder.svg"} alt={rideGroup?.driver?.name} />
                <AvatarFallback>{rideGroup?.driver?.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className='space-y-1'>
                <h3 className='font-semibold text-lg'>{rideGroup?.driver?.name}</h3>
                <div className='flex items-center gap-2 text-sm text-gray-600'>
                  <Phone className='w-4 h-4' />
                  {rideGroup?.driver?.phone}
                </div>
                <div className='text-sm text-gray-600'>{t("driverLicense", { license: rideGroup?.driver?.license_number })}</div>
              </div>
            </div>
            <div className='flex items-start gap-2 text-sm'>
              <MapPin className='w-4 h-4 mt-0.5 text-gray-500' />
              <span className='text-gray-600'>{rideGroup?.driver?.formatted_address}</span>
            </div>
          </CardContent>
        </Card>

        <Card className='h-fit'>
          <CardHeader>
            <CardTitle className='flex items-center gap-2'>
              <School className='w-5 h-5' />
              {t("schoolInformation")}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className='space-y-3'>
              <h3 className='font-semibold text-lg'>{rideGroup?.school?.school_name}</h3>
              <div className='flex items-start gap-2 text-sm'>
                <MapPin className='w-4 h-4 mt-0.5 text-gray-500' />
                <span className='text-gray-600 flex gap-2 items-center'>
                  {t("viewLocation")}:{" "}
                  <a href='#' className='flex gap-2'>
                    <MapIcon className='size-4' /> {t("googleMaps")}
                  </a>
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {rideGroup?.parent_group_subscription?.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className='flex items-center gap-2'>
              <CreditCard className='w-5 h-5' />
              {t("activeSubscriptions")}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              {rideGroup?.parent_group_subscription?.map((subscription) => (
                <div key={subscription.id} className='border rounded-lg p-4 space-y-3'>
                  <div className='flex items-center justify-between'>
                    <Badge className={getStatusColor(subscription.status)}>{subscription.status}</Badge>
                    <span className='font-semibold text-lg'>${subscription.total_amount}</span>
                  </div>
                  <div className='space-y-2 text-sm'>
                    <div className='flex items-center gap-2'>
                      <Users className='w-4 h-4' />
                      {t("seatsTaken", { number: subscription.current_seats_taken })}
                    </div>
                    <div className='flex items-center gap-2'>
                      <Calendar className='w-4 h-4' />
                      {t("seatsTaken", { number: subscription.pickup_days_count })}
                    </div>
                    <div className='flex items-center gap-2'>
                      <Timer className='w-4 h-4' />
                      {subscription.remaining_time} days remaining
                    </div>
                    <div className='text-xs text-gray-500'>
                      Valid: {formatDate(subscription.started_at)} - {formatDate(subscription.valid_until)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {rideGroup?.parentGroups?.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className='flex items-center gap-2'>
              <UserCheck className='w-5 h-5' />
              {t("parentGroupsAndChildren")}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className='space-y-6'>
              {rideGroup?.parentGroups?.map((parentGroup) => (
                <div key={parentGroup.id} className='border rounded-lg p-4'>
                  <div className='flex items-center gap-4 mb-4'>
                    <Avatar className='w-12 h-12'>
                      <AvatarImage src={parentGroup.parent?.profile_pic || "/placeholder.svg"} alt={parentGroup.parent?.name} />
                      <AvatarFallback>{parentGroup.parent?.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className='flex-1'>
                      <div className='flex items-center gap-3'>
                        <h4 className='font-semibold'>{parentGroup.parent?.name}</h4>
                        <div className='flex gap-2'>
                          {parentGroup.parent?.face_auth_complete ? <CheckCircle className='w-4 h-4 text-green-500' /> : <XCircle className='w-4 h-4 text-red-500' />}
                          {parentGroup.parent?.documents_approved ? (
                            <Badge variant='outline' className='text-xs bg-green-50 text-green-700'>
                              {t("verified")}
                            </Badge>
                          ) : (
                            <Badge variant='outline' className='text-xs bg-yellow-50 text-yellow-700'>
                              {t("pending")}
                            </Badge>
                          )}
                        </div>
                      </div>
                      <div className='flex items-center gap-2 text-sm text-gray-600'>
                        <Phone className='w-4 h-4' />
                        {parentGroup.parent?.phone}
                      </div>
                      <div className='flex items-start gap-2 text-sm text-gray-600'>
                        <MapPin className='w-4 h-4 mt-0.5' />
                        {parentGroup.parent?.formatted_address}
                      </div>
                    </div>
                    <div className='text-right'>
                      <div className='text-sm font-medium'>{parentGroup.current_seats_taken} seats</div>
                    </div>
                  </div>

                  {parentGroup?.childDetails?.length > 0 && (
                    <>
                      <Separator className='my-4' />
                      <div className='space-y-3'>
                        <h5 className='font-medium flex items-center gap-2'>
                          <Baby className='w-4 h-4' />
                          {t("children")} ({parentGroup?.childDetails?.length})
                        </h5>
                        <div className='grid grid-cols-1 sm:grid-cols-2 gap-3'>
                          {parentGroup?.childDetails?.map((childDetail) => (
                            <div key={childDetail.id} className='bg-gray-50 rounded-lg p-3'>
                              <div className='flex items-center gap-3'>
                                <Avatar className='w-8 h-8'>
                                  <AvatarImage src={childDetail.child.profile_pic || "/placeholder.svg"} alt={childDetail.child.name} />
                                  <AvatarFallback className='text-xs'>{childDetail.child.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <div className='flex-1'>
                                  <div className='font-medium text-sm'>{childDetail.child.name}</div>
                                  <div className='text-xs text-gray-600'>Grade {childDetail.child.grade}</div>
                                  <div className='flex items-center gap-2 text-xs text-gray-500'>
                                    <Clock className='w-3 h-3' />
                                    {formatTime(childDetail.timing_from)} - {formatTime(childDetail.timing_to)}
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
