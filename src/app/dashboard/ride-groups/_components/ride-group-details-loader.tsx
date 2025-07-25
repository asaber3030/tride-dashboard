"use client"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export function RideGroupLoading() {
  return (
    <div className='mx-auto space-y-6'>
      {/* Header Card Loading */}
      <Card className='border-2'>
        <CardHeader className='pb-4'>
          <div className='flex items-center justify-between'>
            <div className='space-y-3'>
              <Skeleton className='h-8 w-80' />
              <div className='flex items-center gap-4'>
                <Skeleton className='h-6 w-16' />
                <Skeleton className='h-6 w-24' />
                <Skeleton className='h-4 w-32' />
              </div>
            </div>
            <div className='text-right space-y-2'>
              <div className='flex items-center gap-2'>
                <Skeleton className='h-5 w-5' />
                <Skeleton className='h-6 w-24' />
              </div>
              <Skeleton className='h-4 w-32' />
            </div>
          </div>
        </CardHeader>
      </Card>

      <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
        {/* Driver Information Loading */}
        <Card>
          <CardHeader>
            <div className='flex items-center gap-2'>
              <Skeleton className='h-5 w-5' />
              <Skeleton className='h-6 w-40' />
            </div>
          </CardHeader>
          <CardContent className='space-y-4'>
            <div className='flex items-center gap-4'>
              <Skeleton className='w-16 h-16 rounded-full' />
              <div className='space-y-2 flex-1'>
                <Skeleton className='h-6 w-32' />
                <div className='flex items-center gap-2'>
                  <Skeleton className='h-4 w-4' />
                  <Skeleton className='h-4 w-28' />
                </div>
                <Skeleton className='h-4 w-36' />
              </div>
            </div>
            <div className='flex items-start gap-2'>
              <Skeleton className='h-4 w-4 mt-0.5' />
              <Skeleton className='h-4 w-64' />
            </div>
          </CardContent>
        </Card>

        {/* School Information Loading */}
        <Card>
          <CardHeader>
            <div className='flex items-center gap-2'>
              <Skeleton className='h-5 w-5' />
              <Skeleton className='h-6 w-36' />
            </div>
          </CardHeader>
          <CardContent>
            <div className='space-y-3'>
              <Skeleton className='h-6 w-48' />
              <div className='flex items-start gap-2'>
                <Skeleton className='h-4 w-4 mt-0.5' />
                <Skeleton className='h-4 w-40' />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Subscriptions Loading */}
      <Card>
        <CardHeader>
          <div className='flex items-center gap-2'>
            <Skeleton className='h-5 w-5' />
            <Skeleton className='h-6 w-40' />
          </div>
        </CardHeader>
        <CardContent>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            {[1, 2].map((index) => (
              <div key={index} className='border rounded-lg p-4 space-y-3'>
                <div className='flex items-center justify-between'>
                  <Skeleton className='h-6 w-16' />
                  <Skeleton className='h-6 w-20' />
                </div>
                <div className='space-y-2'>
                  <div className='flex items-center gap-2'>
                    <Skeleton className='h-4 w-4' />
                    <Skeleton className='h-4 w-16' />
                  </div>
                  <div className='flex items-center gap-2'>
                    <Skeleton className='h-4 w-4' />
                    <Skeleton className='h-4 w-24' />
                  </div>
                  <div className='flex items-center gap-2'>
                    <Skeleton className='h-4 w-4' />
                    <Skeleton className='h-4 w-28' />
                  </div>
                  <Skeleton className='h-3 w-48' />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Parent Groups Loading */}
      <Card>
        <CardHeader>
          <div className='flex items-center gap-2'>
            <Skeleton className='h-5 w-5' />
            <Skeleton className='h-6 w-48' />
          </div>
        </CardHeader>
        <CardContent>
          <div className='space-y-6'>
            {[1, 2].map((parentIndex) => (
              <div key={parentIndex} className='border rounded-lg p-4'>
                {/* Parent Info Loading */}
                <div className='flex items-center gap-4 mb-4'>
                  <Skeleton className='w-12 h-12 rounded-full' />
                  <div className='flex-1 space-y-2'>
                    <div className='flex items-center gap-3'>
                      <Skeleton className='h-5 w-32' />
                      <div className='flex gap-2'>
                        <Skeleton className='h-4 w-4 rounded-full' />
                        <Skeleton className='h-5 w-16' />
                      </div>
                    </div>
                    <div className='flex items-center gap-2'>
                      <Skeleton className='h-4 w-4' />
                      <Skeleton className='h-4 w-28' />
                    </div>
                    <div className='flex items-start gap-2'>
                      <Skeleton className='h-4 w-4 mt-0.5' />
                      <Skeleton className='h-4 w-56' />
                    </div>
                  </div>
                  <div className='text-right'>
                    <Skeleton className='h-4 w-16' />
                  </div>
                </div>

                {/* Children Loading */}
                <div className='border-t pt-4 space-y-3'>
                  <div className='flex items-center gap-2'>
                    <Skeleton className='h-4 w-4' />
                    <Skeleton className='h-5 w-24' />
                  </div>
                  <div className='grid grid-cols-1 sm:grid-cols-2 gap-3'>
                    {[1, 2].map((childIndex) => (
                      <div key={childIndex} className='bg-gray-50 rounded-lg p-3'>
                        <div className='flex items-center gap-3'>
                          <Skeleton className='w-8 h-8 rounded-full' />
                          <div className='flex-1 space-y-1'>
                            <Skeleton className='h-4 w-24' />
                            <Skeleton className='h-3 w-16' />
                            <div className='flex items-center gap-2'>
                              <Skeleton className='h-3 w-3' />
                              <Skeleton className='h-3 w-20' />
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Schedule Days Loading */}
      <Card>
        <CardHeader>
          <div className='flex items-center gap-2'>
            <Skeleton className='h-5 w-5' />
            <Skeleton className='h-6 w-32' />
          </div>
        </CardHeader>
        <CardContent>
          <div className='flex flex-wrap gap-2'>
            {[1, 2, 3, 4, 5].map((index) => (
              <Skeleton key={index} className='h-6 w-20' />
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
