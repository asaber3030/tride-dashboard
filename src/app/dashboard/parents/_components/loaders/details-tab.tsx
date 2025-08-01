"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Separator } from "@/components/ui/separator"
import { User } from "lucide-react"

export function ParentDetailsTabLoader() {
  return (
    <div className='space-y-6'>
      {/* Profile Section Loader */}
      <Card>
        <CardHeader>
          <CardTitle className='flex items-center gap-2'>
            <User className='h-5 w-5' />
            <Skeleton className='h-5 w-32' />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className='flex flex-col md:flex-row gap-6'>
            <div className='flex flex-col items-center space-y-4'>
              <Skeleton className='h-24 w-24 rounded-full' />
              <Skeleton className='h-6 w-16 rounded-full' />
            </div>

            <div className='flex-1 space-y-4'>
              <div>
                <Skeleton className='h-6 w-48 mb-2' />
                <Skeleton className='h-4 w-24' />
              </div>

              <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                <div className='flex items-center gap-2'>
                  <Skeleton className='h-4 w-4' />
                  <Skeleton className='h-4 w-32' />
                </div>

                <div className='flex items-center gap-2'>
                  <Skeleton className='h-4 w-4' />
                  <Skeleton className='h-4 w-40' />
                </div>

                <div className='flex items-center gap-2'>
                  <Skeleton className='h-4 w-4' />
                  <Skeleton className='h-4 w-56' />
                </div>

                <div className='flex items-center gap-2'>
                  <Skeleton className='h-4 w-4' />
                  <Skeleton className='h-4 w-36' />
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Account Information Loader */}
      <Card>
        <CardHeader>
          <CardTitle>
            <Skeleton className='h-5 w-40' />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <div className='space-y-2'>
              <Skeleton className='h-4 w-24' />
              <Skeleton className='h-6 w-20 rounded-full' />
            </div>

            <div className='space-y-2'>
              <Skeleton className='h-4 w-32' />
              <Skeleton className='h-6 w-16 rounded-full' />
            </div>

            <div className='space-y-2'>
              <Skeleton className='h-4 w-20' />
              <div className='flex items-center gap-2'>
                <Skeleton className='h-4 w-4' />
                <Skeleton className='h-4 w-16' />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Documents Status Loader */}
      <Card>
        <CardHeader>
          <CardTitle>
            <Skeleton className='h-5 w-36' />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className='space-y-4'>
            <div className='flex items-center justify-between'>
              <Skeleton className='h-4 w-16' />
              <div className='flex items-center gap-2'>
                <Skeleton className='h-4 w-4' />
                <Skeleton className='h-4 w-20' />
              </div>
            </div>

            <div className='flex items-center justify-between'>
              <Skeleton className='h-4 w-28' />
              <Skeleton className='h-4 w-24' />
            </div>

            <Separator />

            <div className='text-sm'>
              <Skeleton className='h-4 w-48' />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
