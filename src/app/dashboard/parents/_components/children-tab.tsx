"use client"

import { useTranslations } from "next-intl"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Users, GraduationCap } from "lucide-react"

type Child = {
  id: number
  name: string
  profile_pic: string
  grade: string
  gender: string
  parent_id: number
}

interface ChildrenDetailsTabProps {
  children: Child[]
}

export function ChildrenDetailsTab({ children }: ChildrenDetailsTabProps) {
  const t = useTranslations()

  if (children.length === 0) {
    return (
      <Card>
        <CardContent className='flex flex-col items-center justify-center py-12'>
          <Users className='h-12 w-12 text-muted-foreground mb-4' />
          <h3 className='text-lg font-semibold mb-2'>{t("parentDetails.children.noChildren")}</h3>
          <p className='text-muted-foreground text-center'>{t("parentDetails.children.noChildrenDescription")}</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className='space-y-4'>
      <div className='flex items-center gap-2 mb-6'>
        <Users className='h-5 w-5' />
        <h2 className='text-xl font-semibold'>
          {t("parentDetails.children.title")} ({children.length})
        </h2>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
        {children.map((child) => (
          <Card key={child.id} className='hover:shadow-md transition-shadow'>
            <CardHeader className='pb-3'>
              <div className='flex items-center space-x-3'>
                <Avatar className='h-12 w-12'>
                  <AvatarImage src={child.profile_pic || "/placeholder.svg"} alt={child.name} />
                  <AvatarFallback>
                    {child.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")
                      .toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className='flex-1'>
                  <CardTitle className='text-lg'>{child.name}</CardTitle>
                  <p className='text-sm text-muted-foreground'>ID: {child.id}</p>
                </div>
              </div>
            </CardHeader>

            <CardContent className='pt-0'>
              <div className='space-y-3'>
                <div className='flex items-center justify-between'>
                  <span className='text-sm font-medium'>{t("parentDetails.children.grade")}</span>
                  <div className='flex items-center gap-1'>
                    <GraduationCap className='h-4 w-4 text-muted-foreground' />
                    <Badge variant='secondary'>{child.grade}</Badge>
                  </div>
                </div>

                <div className='flex items-center justify-between'>
                  <span className='text-sm font-medium'>{t("parentDetails.children.gender")}</span>
                  <Badge variant={child.gender === "male" ? "default" : "secondary"}>{t(`parentDetails.gender.${child.gender}`)}</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
