"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Users } from "lucide-react"

export function ChildrenDetailsTabLoader() {
  return (
    <div className='space-y-4'>
      <div className='flex items-center gap-2 mb-6'>
        <Users className='h-5 w-5' />
        <Skeleton className='h-6 w-32' />
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
        {Array.from({ length: 3 }).map((_, index) => (
          <Card key={index} className='hover:shadow-md transition-shadow'>
            <CardHeader className='pb-3'>
              <div className='flex items-center space-x-3'>
                <Skeleton className='h-12 w-12 rounded-full' />
                <div className='flex-1'>
                  <CardTitle>
                    <Skeleton className='h-5 w-32' />
                  </CardTitle>
                  <Skeleton className='h-4 w-16 mt-1' />
                </div>
              </div>
            </CardHeader>

            <CardContent className='pt-0'>
              <div className='space-y-3'>
                <div className='flex items-center justify-between'>
                  <Skeleton className='h-4 w-12' />
                  <div className='flex items-center gap-1'>
                    <Skeleton className='h-4 w-4' />
                    <Skeleton className='h-6 w-16 rounded-full' />
                  </div>
                </div>

                <div className='flex items-center justify-between'>
                  <Skeleton className='h-4 w-16' />
                  <Skeleton className='h-6 w-14 rounded-full' />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
