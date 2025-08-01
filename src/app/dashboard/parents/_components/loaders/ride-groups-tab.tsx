"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Button } from "@/components/ui/button"
import { Car, Eye } from "lucide-react"

export function RideGroupsTabLoader() {
  return (
    <div className='space-y-4'>
      <div className='flex items-center gap-2 mb-6'>
        <Car className='h-5 w-5' />
        <Skeleton className='h-6 w-40' />
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
        {Array.from({ length: 6 }).map((_, index) => (
          <Card key={index} className='hover:shadow-md transition-shadow'>
            <CardHeader className='pb-3'>
              <div className='flex items-start justify-between'>
                <CardTitle>
                  <Skeleton className='h-5 w-48' />
                </CardTitle>
                <Skeleton className='h-6 w-16 rounded-full' />
              </div>
            </CardHeader>

            <CardContent className='space-y-4'>
              {/* School Info Loader */}
              <div className='flex items-center gap-2'>
                <Skeleton className='h-4 w-4' />
                <Skeleton className='h-4 w-40' />
              </div>

              {/* Driver Info Loader */}
              <div className='flex items-center gap-2'>
                <Skeleton className='h-6 w-6 rounded-full' />
                <Skeleton className='h-4 w-32' />
              </div>

              {/* Seats Info Loader */}
              <div className='flex items-center gap-2'>
                <Skeleton className='h-4 w-4' />
                <Skeleton className='h-4 w-24' />
              </div>

              {/* Created Date Loader */}
              <div className='flex items-center gap-2'>
                <Skeleton className='h-4 w-4' />
                <Skeleton className='h-4 w-20' />
              </div>

              {/* Group Type and Button Loader */}
              <div className='flex items-center justify-between'>
                <Skeleton className='h-6 w-16 rounded-full' />
                <Button size='sm' variant='outline' disabled className='flex items-center gap-1 bg-transparent'>
                  <Eye className='h-3 w-3' />
                  <Skeleton className='h-4 w-20' />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
