"use client"

import { useTranslations } from "next-intl"
import { usePayment } from "../_helpers/hooks"

import { notFound } from "next/navigation"

import { Calendar, CreditCard, MapPin, Phone, School, User, Users } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DisplayError } from "@/components/common/error"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"

export function PaymentDetails({ id }: { id: number }) {
  const t = useTranslations()

  const { data: payment, isLoading, isError, error } = usePayment(id)

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    })
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800 border-green-200"
      case "expired":
        return "bg-red-100 text-red-800 border-red-200"
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  if (isLoading) return <PaymentDetailsLoading />
  if (isError) return <DisplayError error={error} />
  if (!payment) return notFound()

  return (
    <div className='min-h-screen'>
      <div className='mx-auto space-y-6'>
        {/* Header */}
        <div className='flex items-center gap-4'>
          <div>
            <h1 className='text-2xl font-bold text-gray-900'>{t("paymentDetails.title")}</h1>
            <p className='text-gray-600'>{t("paymentDetails.paymentId", { id: payment?.id })}</p>
          </div>
        </div>

        {/* Payment Overview */}
        <Card>
          <CardHeader>
            <div className='flex items-center justify-between'>
              <div>
                <CardTitle className='flex items-center gap-2'>
                  <CreditCard className='h-5 w-5' />
                  {t("paymentOverview.title")}
                </CardTitle>
                <CardDescription>{t("paymentOverview.description")}</CardDescription>
              </div>
              <Badge className={getStatusColor(payment?.status)}>{payment?.status?.charAt(0).toUpperCase() + payment?.status?.slice(1)}</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
              <div>
                <p className='text-sm font-medium text-gray-500'>{t("paymentOverview.totalAmount")}</p>
                <p className='text-2xl font-bold text-gray-900'>${payment?.total_amount}</p>
              </div>
              <div>
                <p className='text-sm font-medium text-gray-500'>{t("paymentOverview.seatsTaken")}</p>
                <p className='text-2xl font-bold text-gray-900'>{payment?.current_seats_taken}</p>
              </div>
              <div>
                <p className='text-sm font-medium text-gray-500'>{t("paymentOverview.pickupDays")}</p>
                <p className='text-2xl font-bold text-gray-900'>{payment?.pickup_days_count}</p>
              </div>
              <div>
                <p className='text-sm font-medium text-gray-500'>{t("paymentOverview.remainingDays")}</p>
                <p className='text-2xl font-bold text-gray-900'>{payment?.remaining_time}</p>
              </div>
            </div>
            <Separator className='my-6' />
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
              <div>
                <p className='text-sm font-medium text-gray-500 mb-1'>{t("paymentOverview.startedAt")}</p>
                <p className='text-gray-900 flex items-center gap-2'>
                  <Calendar className='h-4 w-4' />
                  {formatDate(payment?.started_at)}
                </p>
              </div>
              <div>
                <p className='text-sm font-medium text-gray-500 mb-1'>{t("paymentOverview.validUntil")}</p>
                <p className='text-gray-900 flex items-center gap-2'>
                  <Calendar className='h-4 w-4' />
                  {formatDate(payment?.valid_until)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Parent Information */}
        <Card>
          <CardHeader>
            <CardTitle className='flex items-center gap-2'>
              <User className='h-5 w-5' />
              {t("parentInformation.title")}
            </CardTitle>
          </CardHeader>
          <CardContent className='space-y-4'>
            <div className='flex items-center gap-4'>
              <img src={payment?.parent?.profile_pic || "/placeholder.svg"} alt={payment?.parent?.name} className='h-16 w-16 rounded-full object-cover' />
              <div>
                <h3 className='font-semibold text-lg'>{payment?.parent?.name}</h3>
                <p className='text-gray-600'>{payment?.parent?.account?.email}</p>
                <Badge variant='outline' className='mt-1'>
                  {payment?.parent?.account?.account_type}
                </Badge>
              </div>
            </div>
            <Separator />
            <div className='space-y-3'>
              <div className='flex items-center gap-2'>
                <Phone className='h-4 w-4 text-gray-500' />
                <span>{payment?.parent.phone}</span>
              </div>
              <div className='flex items-center gap-2'>
                <MapPin className='h-4 w-4 text-gray-500' />
                <span>
                  <a href='#' className='text-blue-500'>
                    {t("parentInformation.viewLocation")}
                  </a>
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Ride Group & School */}
        <Card>
          <CardHeader>
            <CardTitle className='flex items-center gap-2'>
              <Users className='h-5 w-5' />
              {t("rideGroup.title")}
            </CardTitle>
          </CardHeader>
          <CardContent className='space-y-4'>
            <div>
              <h3 className='font-semibold text-lg'>{payment?.rideGroup.group_name}</h3>
              <p className='text-gray-600 capitalize'>
                {payment?.rideGroup.group_type} {t("rideGroup.group")}
              </p>
            </div>
            <Separator />
            <div className='space-y-3'>
              <div className='flex items-center justify-between'>
                <span className='text-gray-600'>{t("rideGroup.currentSeatsTaken")}</span>
                <span className='font-medium'>{payment?.rideGroup.current_seats_taken}</span>
              </div>
              <div className='flex items-center gap-2'>
                <School className='h-4 w-4 text-gray-500' />
                <span>{payment?.rideGroup.school.school_name}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Plan Information */}
        <Card>
          <CardHeader>
            <CardTitle>{t("planInformation.title")}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
              <div>
                <p className='text-sm font-medium text-gray-500'>{t("planInformation.planId")}</p>
                <p className='text-lg font-semibold'>{payment?.plan.id}</p>
              </div>
              <div>
                <p className='text-sm font-medium text-gray-500'>{t("planInformation.duration")}</p>
                <p className='text-lg font-semibold'>{payment?.plan.range}</p>
              </div>
              <div>
                <p className='text-sm font-medium text-gray-500'>{t("planInformation.monthsCount")}</p>
                <p className='text-lg font-semibold'>
                  {payment?.plan.months_count} {t("planInformation.months")}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Payment History */}
        <Card>
          <CardHeader>
            <CardTitle>{t("paymentHistory.title")}</CardTitle>
            <CardDescription>{t("paymentHistory.description")}</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{t("paymentHistory.receiptId")}</TableHead>
                  <TableHead>{t("paymentHistory.date")}</TableHead>
                  <TableHead>{t("paymentHistory.amount")}</TableHead>
                  <TableHead>{t("paymentHistory.subscriptionId")}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {payment?.payment_history.map((history) => (
                  <TableRow key={history.id}>
                    <TableCell className='font-medium'>{history.paymob_receipt_id}</TableCell>
                    <TableCell>{formatDate(history.paid_at)}</TableCell>
                    <TableCell className='font-semibold'>${history.amount}</TableCell>
                    <TableCell>{history.parent_subscription_id}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function PaymentDetailsLoading() {
  return (
    <div className='min-h-screen'>
      <div className='mx-auto space-y-6'>
        {/* Header Loading */}
        <div className='flex items-center gap-4'>
          <Skeleton className='h-9 w-32' />
          <div>
            <Skeleton className='h-8 w-48 mb-2' />
            <Skeleton className='h-4 w-32' />
          </div>
        </div>

        {/* Payment Overview Loading */}
        <Card>
          <CardHeader>
            <div className='flex items-center justify-between'>
              <div>
                <Skeleton className='h-6 w-40 mb-2' />
                <Skeleton className='h-4 w-64' />
              </div>
              <Skeleton className='h-6 w-16 rounded-full' />
            </div>
          </CardHeader>
          <CardContent>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
              {[...Array(4)].map((_, i) => (
                <div key={i}>
                  <Skeleton className='h-4 w-24 mb-2' />
                  <Skeleton className='h-8 w-16' />
                </div>
              ))}
            </div>
            <Separator className='my-6' />
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
              {[...Array(2)].map((_, i) => (
                <div key={i}>
                  <Skeleton className='h-4 w-20 mb-2' />
                  <Skeleton className='h-5 w-48' />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
          <Card>
            <CardHeader>
              <Skeleton className='h-6 w-40' />
            </CardHeader>
            <CardContent className='space-y-4'>
              <div className='flex items-center gap-4'>
                <Skeleton className='h-16 w-16 rounded-full' />
                <div>
                  <Skeleton className='h-6 w-32 mb-2' />
                  <Skeleton className='h-4 w-48 mb-2' />
                  <Skeleton className='h-5 w-16 rounded-full' />
                </div>
              </div>
              <Separator />
              <div className='space-y-3'>
                <Skeleton className='h-4 w-36' />
                <Skeleton className='h-4 w-48' />
              </div>
            </CardContent>
          </Card>

          {/* Ride Group Loading */}
          <Card>
            <CardHeader>
              <Skeleton className='h-6 w-40' />
            </CardHeader>
            <CardContent className='space-y-4'>
              <div>
                <Skeleton className='h-6 w-32 mb-2' />
                <Skeleton className='h-4 w-24' />
              </div>
              <Separator />
              <div className='space-y-3'>
                <div className='flex items-center justify-between'>
                  <Skeleton className='h-4 w-32' />
                  <Skeleton className='h-4 w-8' />
                </div>
                <Skeleton className='h-4 w-48' />
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <Skeleton className='h-6 w-32' />
          </CardHeader>
          <CardContent>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
              {[...Array(3)].map((_, i) => (
                <div key={i}>
                  <Skeleton className='h-4 w-20 mb-2' />
                  <Skeleton className='h-6 w-16' />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <Skeleton className='h-6 w-32 mb-2' />
            <Skeleton className='h-4 w-64' />
          </CardHeader>
          <CardContent>
            <div className='space-y-4'>
              <div className='grid grid-cols-4 gap-4 pb-2 border-b'>
                {[...Array(4)].map((_, i) => (
                  <Skeleton key={i} className='h-4 w-24' />
                ))}
              </div>
              {[...Array(3)].map((_, i) => (
                <div key={i} className='grid grid-cols-4 gap-4 py-2'>
                  <Skeleton className='h-4 w-20' />
                  <Skeleton className='h-4 w-32' />
                  <Skeleton className='h-4 w-16' />
                  <Skeleton className='h-4 w-12' />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
