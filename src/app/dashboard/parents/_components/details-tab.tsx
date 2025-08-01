"use client"

import { useTranslations } from "next-intl"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { MapPin, Phone, Mail, Calendar, CheckCircle, XCircle, User } from "lucide-react"

type Account = {
  id: number
  email: string
  account_type: string
  is_verified: boolean
  auth_method: string
}

type Child = {
  id: number
  name: string
  profile_pic: string
  grade: string
  gender: string
  parent_id: number
}

type Parent = {
  id: number
  account_id: number
  name: string
  profile_pic: string
  phone: string
  google_place_id: string
  lat: string
  lng: string
  formatted_address: string
  city_id: number
  gender: string
  front_side_nic: string
  back_side_nic: string
  face_auth_complete: boolean
  documents_approved: boolean
  documents_approval_date: string | null
  created_at: string
  updated_at: string
  account: Account
  children: Child[]
}

interface ParentDetailsTabProps {
  parent: Parent
}

export function ParentDetailsTab({ parent }: ParentDetailsTabProps) {
  const t = useTranslations()

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString()
  }

  return (
    <div className='space-y-6'>
      {/* Profile Section */}
      <Card>
        <CardHeader>
          <CardTitle className='flex items-center gap-2'>
            <User className='h-5 w-5' />
            {t("parentDetails.profile.title")}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className='flex flex-col md:flex-row gap-6'>
            <div className='flex flex-col items-center space-y-4'>
              <Avatar className='h-24 w-24'>
                <AvatarImage src={parent.profile_pic || "/placeholder.svg"} alt={parent.name} />
                <AvatarFallback className='text-lg'>
                  {parent.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                    .toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <Badge variant={parent.gender === "male" ? "default" : "secondary"}>{t(`parentDetails.gender.${parent.gender}`)}</Badge>
            </div>

            <div className='flex-1 space-y-4'>
              <div>
                <h3 className='text-xl font-semibold'>{parent.name}</h3>
                <p className='text-muted-foreground'>ID: {parent.id}</p>
              </div>

              <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                <div className='flex items-center gap-2'>
                  <Phone className='h-4 w-4 text-muted-foreground' />
                  <span>{parent.phone}</span>
                </div>

                <div className='flex items-center gap-2'>
                  <Mail className='h-4 w-4 text-muted-foreground' />
                  <span>{parent.account.email}</span>
                </div>

                <div className='flex items-center gap-2'>
                  <MapPin className='h-4 w-4 text-muted-foreground' />
                  <span className='text-sm'>{parent.formatted_address}</span>
                </div>

                <div className='flex items-center gap-2'>
                  <Calendar className='h-4 w-4 text-muted-foreground' />
                  <span className='text-sm'>
                    {t("parentDetails.joinedOn")}: {formatDate(parent.created_at)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Account Information */}
      <Card>
        <CardHeader>
          <CardTitle>{t("parentDetails.account.title")}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <div className='space-y-2'>
              <label className='text-sm font-medium text-muted-foreground'>{t("parentDetails.account.type")}</label>
              <Badge variant='outline'>{parent.account.account_type}</Badge>
            </div>

            <div className='space-y-2'>
              <label className='text-sm font-medium text-muted-foreground'>{t("parentDetails.account.authMethod")}</label>
              <Badge variant='outline'>{parent.account.auth_method}</Badge>
            </div>

            <div className='space-y-2'>
              <label className='text-sm font-medium text-muted-foreground'>{t("parentDetails.account.verified")}</label>
              <div className='flex items-center gap-2'>
                {parent.account.is_verified ? <CheckCircle className='h-4 w-4 text-green-500' /> : <XCircle className='h-4 w-4 text-red-500' />}
                <span className='text-sm'>{parent.account.is_verified ? t("parentDetails.account.verifiedYes") : t("parentDetails.account.verifiedNo")}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Documents Status */}
      <Card>
        <CardHeader>
          <CardTitle>{t("parentDetails.documents.title")}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className='space-y-4'>
            <div className='flex items-center justify-between'>
              <span className='font-medium'>{t("parentDetails.documents.status")}</span>
              <div className='flex items-center gap-2'>
                {parent.documents_approved ? <CheckCircle className='h-4 w-4 text-green-500' /> : <XCircle className='h-4 w-4 text-red-500' />}
                <span className='text-sm'>{parent.documents_approved ? t("parentDetails.documents.approved") : t("parentDetails.documents.pending")}</span>
              </div>
            </div>

            {parent.documents_approval_date && (
              <div className='flex items-center justify-between'>
                <span className='font-medium'>{t("parentDetails.documents.approvalDate")}</span>
                <span className='text-sm text-muted-foreground'>{formatDate(parent.documents_approval_date)}</span>
              </div>
            )}

            <Separator />

            <div className='text-sm text-muted-foreground'>
              <p>
                {t("parentDetails.documents.lastUpdated")}: {formatDate(parent.updated_at)}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
