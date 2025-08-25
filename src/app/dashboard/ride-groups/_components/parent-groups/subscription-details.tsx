import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CalendarDays, Users, School, CreditCard, Clock, MapPin } from "lucide-react"
import { ParentGroup, ParentGroupSubscription } from "@/types/models"
import { cn } from "@/lib/utils"

interface SubscriptionDisplayProps {
  parentGroup: ParentGroup
  sub: ParentGroupSubscription
}

export function SubscriptionDisplay({ parentGroup, sub }: SubscriptionDisplayProps) {
  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case "active":
        return "bg-green-100 text-green-800 border-green-200"
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "expired":
        return "bg-red-100 text-red-800 border-red-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric"
    })
  }

  const formatRemainingTime = (days: number) => {
    if (days > 30) {
      const months = Math.floor(days / 30)
      return `${months} month${months > 1 ? "s" : ""}`
    }
    return `${days} day${days > 1 ? "s" : ""}`
  }

  if (!sub) return null

  return (
    <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
      {/* Subscription Status Card */}
      <Card className='col-span-full md:col-span-1 h-fit'>
        <CardHeader>
          <CardTitle className='flex items-center gap-2 text-lg'>
            <CreditCard className='h-5 w-5 text-primary' />
            Subscription Status
          </CardTitle>
        </CardHeader>
        <CardContent className='space-y-4'>
          <div className='flex items-center justify-between'>
            <span className='text-sm font-medium text-muted-foreground'>Status</span>
            <Badge className={cn(getStatusColor(sub.status), "capitalize")}>{sub.status || "N/A"}</Badge>
          </div>
          <div className='flex items-center justify-between'>
            <span className='text-sm font-medium text-muted-foreground'>Total Amount</span>
            <span className='font-semibold text-lg'>{sub.total_amount} EGP</span>
          </div>
          <div className='flex items-center gap-2 text-sm'>
            <Clock className='h-4 w-4 text-muted-foreground' />
            <span className='text-muted-foreground'>{formatRemainingTime(sub.remaining_time)} remaining</span>
          </div>
        </CardContent>
      </Card>

      {/* Group Information Card */}
      <Card className='col-span-full md:col-span-1 h-fit'>
        <CardHeader>
          <CardTitle className='flex items-center gap-2 text-lg'>
            <Users className='h-5 w-5 text-primary' />
            Group Details
          </CardTitle>
        </CardHeader>
        <CardContent className='space-y-4'>
          <div>
            <span className='text-sm font-medium text-muted-foreground'>Group Name</span>
            <p className='font-semibold'>{sub.rideGroup.group_name}</p>
          </div>
          <div className='flex items-center justify-between'>
            <span className='text-sm font-medium text-muted-foreground'>Seats Taken</span>
            <Badge variant='outline' className='font-mono'>
              {sub.current_seats_taken}
            </Badge>
          </div>
          <div className='flex items-center gap-2'>
            <School className='h-4 w-4 text-muted-foreground' />
            <span className='text-sm'>{sub.rideGroup.school.school_name}</span>
          </div>
        </CardContent>
      </Card>

      {/* Plan & Timeline Card */}
      {sub.plan && (
        <Card className='col-span-full md:col-span-2 lg:col-span-1 h-fit'>
          <CardHeader>
            <CardTitle className='flex items-center gap-2 text-lg'>
              <CalendarDays className='h-5 w-5 text-primary' />
              Plan & Timeline
            </CardTitle>
          </CardHeader>
          <CardContent className='space-y-4'>
            <div>
              <span className='text-sm font-medium text-muted-foreground'>Parent Name</span>
              <p className='font-semibold'>{sub.parent.name}</p>
            </div>
            <div>
              <span className='text-sm font-medium text-muted-foreground'>Plan Duration</span>
              <p className='font-semibold'>{sub.plan.months_count} months</p>
            </div>
            <div className='grid grid-cols-2 gap-4 pt-2'>
              <div>
                <span className='text-xs text-muted-foreground'>Started</span>
                <p className='text-sm font-medium'>{formatDate(sub.started_at)}</p>
              </div>
              <div>
                <span className='text-xs text-muted-foreground'>Valid Until</span>
                <p className='text-sm font-medium'>{formatDate(sub.valid_until)}</p>
              </div>
            </div>
            <div className='flex items-center gap-2 pt-2'>
              <MapPin className='h-4 w-4 text-muted-foreground' />
              <span className='text-sm'>{sub.pickup_days_count} pickup days</span>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
