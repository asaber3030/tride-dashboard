"use client"

import { useTranslations } from "next-intl"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Users, MapPin, Calendar, Car, GraduationCap, Phone, CreditCard, Clock, User, BadgeIcon as IdCard, CheckCircle, XCircle } from "lucide-react"
import { FullRideGroup } from "@/types/models"
import { capitalize } from "@/lib/utils"

interface RideGroupModalProps {
  rideGroup: FullRideGroup
  isOpen: boolean
  onClose: () => void
}

export function RideGroupModal({ rideGroup, isOpen, onClose }: RideGroupModalProps) {
  const t = useTranslations()

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString()
  }

  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleString()
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

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className='max-h-[90vh] w-[78%] min-w-[78%]'>
        <DialogHeader>
          <DialogTitle className='flex items-center gap-2'>
            <Car className='h-5 w-5' />
            {rideGroup?.group_name}
          </DialogTitle>
        </DialogHeader>

        <ScrollArea className='max-h-[calc(90vh-120px)]'>
          <div className='space-y-6 pr-4'>
            {/* Group Overview */}
            <Card>
              <CardHeader>
                <CardTitle className='flex items-center gap-2'>
                  <Users className='h-5 w-5' />
                  {t("parentDetails.rideGroups.modal.groupOverview")}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                  <div className='space-y-2'>
                    <label className='text-sm font-medium text-muted-foreground'>{t("parentDetails.rideGroups.modal.groupId")}</label>
                    <p>{rideGroup?.id}</p>
                  </div>
                  <div className='space-y-2'>
                    <label className='text-sm font-medium text-muted-foreground'>{t("parentDetails.rideGroups.modal.status")}</label>
                    <Badge variant={getStatusColor(rideGroup?.status)}>{rideGroup?.status || "N/A"}</Badge>
                  </div>
                  <div className='space-y-2'>
                    <label className='text-sm font-medium text-muted-foreground'>{t("parentDetails.rideGroups.modal.groupType")}</label>
                    <Badge variant='outline'>{capitalize(rideGroup?.group_type)}</Badge>
                  </div>
                  <div className='space-y-2 space-x-2'>
                    <label className='text-sm font-medium text-muted-foreground'>{t("parentDetails.rideGroups.modal.inviteCode")}</label>
                    <p className='font-mono text-sm bg-muted px-2 py-1 rounded'>{rideGroup?.invite_code || "N/A"}</p>
                  </div>
                  <div className='space-y-2'>
                    <label className='text-sm font-medium text-muted-foreground'>{t("parentDetails.rideGroups.modal.currentSeats")}</label>
                    <p>{rideGroup?.current_seats_taken}</p>
                  </div>
                  <div className='space-y-2'>
                    <label className='text-sm font-medium text-muted-foreground'>{t("parentDetails.rideGroups.modal.createdAt")}</label>
                    <p>{formatDateTime(rideGroup?.created_at)}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Driver Information */}
            {rideGroup?.driver ? (
              <Card>
                <CardHeader>
                  <CardTitle className='flex items-center gap-2'>
                    <Car className='h-5 w-5' />
                    {t("parentDetails.rideGroups.modal.driverInfo")}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className='flex items-start gap-4'>
                    <Avatar className='h-16 w-16'>
                      <AvatarImage src={rideGroup?.driver?.profile_pic || "/placeholder.svg"} alt={rideGroup?.driver?.name} />
                      <AvatarFallback>
                        {rideGroup?.driver?.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")
                          .toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className='flex-1 space-y-3'>
                      <div>
                        <h3 className='text-lg font-semibold'>{rideGroup?.driver?.name}</h3>
                        <p className='text-muted-foreground'>ID: {rideGroup?.driver?.id}</p>
                      </div>
                      <div className='grid grid-cols-1 md:grid-cols-2 gap-3'>
                        <div className='flex items-center gap-2'>
                          <Phone className='h-4 w-4 text-muted-foreground' />
                          <span>{rideGroup?.driver?.phone}</span>
                        </div>
                        <div className='flex items-center gap-2'>
                          <IdCard className='h-4 w-4 text-muted-foreground' />
                          <span>{rideGroup?.driver?.license_number}</span>
                        </div>
                        <div className='flex items-center gap-2'>
                          <User className='h-4 w-4 text-muted-foreground' />
                          <Badge variant='outline'>{rideGroup?.driver?.gender}</Badge>
                        </div>
                        <div className='flex items-center gap-2'>
                          <MapPin className='h-4 w-4 text-muted-foreground' />
                          <span className='text-sm'>{rideGroup?.driver?.formatted_address}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card className='bg-muted text-muted-foreground'>
                <CardContent className='flex flex-col gap-2 items-center justify-center p-6'>
                  <Car className='h-12 w-12' />
                  <h3 className='text-lg font-semibold'>{t("parentDetails.rideGroups.modal.noDriver")}</h3>
                  <p className='text-center'>{t("parentDetails.rideGroups.modal.noDriverDescription")}</p>
                </CardContent>
              </Card>
            )}

            {/* School Information */}
            <Card>
              <CardHeader>
                <CardTitle className='flex items-center gap-2'>
                  <GraduationCap className='h-5 w-5' />
                  {t("parentDetails.rideGroups.modal.schoolInfo")}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className='space-y-3'>
                  <div>
                    <h3 className='text-lg font-semibold'>{rideGroup?.school?.school_name}</h3>
                    <p className='text-muted-foreground'>ID: {rideGroup?.school?.id}</p>
                  </div>
                  <div className='flex items-center gap-2'>
                    <MapPin className='h-4 w-4 text-muted-foreground' />
                    <span>
                      Lat: {rideGroup?.school?.lat}, Lng: {rideGroup?.school?.lng}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Parent Groups */}
            <Card>
              <CardHeader>
                <CardTitle className='flex items-center gap-2'>
                  <Users className='h-5 w-5' />
                  {t("parentDetails.rideGroups.modal.parentGroups")} ({rideGroup?.parentGroups?.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className='space-y-4'>
                  {rideGroup?.parentGroups?.map((parentGroup, index) => (
                    <div key={parentGroup.id} className='border rounded-lg p-4'>
                      <div className='flex items-start gap-4 mb-4'>
                        <Avatar className='h-12 w-12'>
                          <AvatarImage src={parentGroup.parent?.profile_pic || "/placeholder.svg"} alt={parentGroup.parent?.name} />
                          <AvatarFallback>
                            {parentGroup.parent?.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")
                              .toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div className='flex-1'>
                          <h4 className='font-semibold'>{parentGroup.parent?.name}</h4>
                          <p className='text-sm text-muted-foreground'>
                            {t("parentDetails.rideGroups.modal.seatsUsed")}: {parentGroup.current_seats_taken}
                          </p>
                          <div className='flex items-center gap-2 mt-1'>
                            <Phone className='h-3 w-3 text-muted-foreground' />
                            <span className='text-sm'>{parentGroup.parent?.phone}</span>
                          </div>
                          <div className='flex items-center gap-2 mt-1'>
                            <MapPin className='h-3 w-3 text-muted-foreground' />
                            <span className='text-sm'>{parentGroup.parent?.formatted_address}</span>
                          </div>
                          <div className='flex items-center gap-2 mt-1'>
                            {parentGroup.parent?.documents_approved ? <CheckCircle className='h-3 w-3 text-green-500' /> : <XCircle className='h-3 w-3 text-red-500' />}
                            <span className='text-sm'>{parentGroup.parent?.documents_approved ? t("parentDetails.rideGroups.modal.documentsApproved") : t("parentDetails.rideGroups.modal.documentsPending")}</span>
                          </div>
                        </div>
                      </div>

                      {/* Children Details */}
                      {parentGroup.childDetails.length > 0 && (
                        <div className='mt-4'>
                          <h5 className='font-medium mb-2'>{t("parentDetails.rideGroups.modal.children")}:</h5>
                          <div className='grid grid-cols-1 md:grid-cols-2 gap-3'>
                            {parentGroup.childDetails.map((childDetail) => (
                              <div key={childDetail?.id} className='flex items-center gap-3 p-2 bg-muted rounded'>
                                <Avatar className='h-8 w-8'>
                                  <AvatarImage src={childDetail?.child?.profile_pic || "/placeholder.svg"} alt={childDetail?.child?.name} />
                                  <AvatarFallback className='text-xs'>
                                    {childDetail?.child?.name
                                      .split(" ")
                                      .map((n) => n[0])
                                      .join("")
                                      .toUpperCase()}
                                  </AvatarFallback>
                                </Avatar>
                                <div className='flex-1'>
                                  <p className='text-sm font-medium'>{childDetail?.child?.name}</p>
                                  <p className='text-xs text-muted-foreground'>{childDetail?.child?.grade}</p>
                                  <div className='flex items-center gap-1 mt-1'>
                                    <Clock className='h-3 w-3 text-muted-foreground' />
                                    <span className='text-xs'>
                                      {childDetail?.timing_from} - {childDetail?.timing_to}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {index < rideGroup?.parentGroups?.length - 1 && <Separator className='mt-4' />}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Subscriptions */}
            {rideGroup?.parent_group_subscription?.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className='flex items-center gap-2'>
                    <CreditCard className='h-5 w-5' />
                    {t("parentDetails.rideGroups.modal.subscriptions")}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className='space-y-4'>
                    {rideGroup?.parent_group_subscription?.map((subscription) => (
                      <div key={subscription.id} className='border rounded-lg p-4'>
                        <div className='grid grid-cols-1 md:grid-cols-2 gap-3'>
                          <div className='space-y-2'>
                            <label className='text-sm font-medium text-muted-foreground'>{t("parentDetails.rideGroups.modal.subscriptionId")}</label>
                            <p>{subscription.id}</p>
                          </div>
                          <div className='space-y-2'>
                            <label className='text-sm font-medium text-muted-foreground'>{t("parentDetails.rideGroups.modal.totalAmount")}</label>
                            <p className='font-semibold'>${subscription.total_amount}</p>
                          </div>
                          <div className='space-y-2'>
                            <label className='text-sm font-medium text-muted-foreground'>{t("parentDetails.rideGroups.modal.validUntil")}</label>
                            <p>{formatDate(subscription.valid_until)}</p>
                          </div>
                          <div className='space-y-2'>
                            <label className='text-sm font-medium text-muted-foreground'>{t("parentDetails.rideGroups.modal.remainingTime")}</label>
                            <p>
                              {subscription.remaining_time} {t("parentDetails.rideGroups.modal.days")}
                            </p>
                          </div>
                          <div className='space-y-2'>
                            <label className='text-sm font-medium text-muted-foreground'>{t("parentDetails.rideGroups.modal.pickupDays")}</label>
                            <p>{subscription.pickup_days_count}</p>
                          </div>
                          <div className='space-y-2'>
                            <label className='text-sm font-medium text-muted-foreground'>{t("parentDetails.rideGroups.modal.subscriptionStatus")}</label>
                            <Badge variant={getStatusColor(subscription.status)}>{subscription.status}</Badge>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Day Dates */}
            {rideGroup?.dayDates?.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className='flex items-center gap-2'>
                    <Calendar className='h-5 w-5' />
                    {t("parentDetails.rideGroups.modal.scheduledDays")}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className='flex flex-wrap gap-2'>
                    {rideGroup?.dayDates?.map((dayDate) => (
                      <Badge key={dayDate.id} variant='outline'>
                        {dayDate.date_day}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}
