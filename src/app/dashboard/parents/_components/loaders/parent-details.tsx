"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { ParentDetailsTabLoader } from "./details-tab"
import { ChildrenDetailsTabLoader } from "./children-tab"
import { RideGroupsTabLoader } from "./ride-groups-tab"

export default function ParentDetailsLoader() {
  return (
    <div className='w-full mx-auto'>
      <Card>
        <CardHeader>
          <CardTitle>
            <Skeleton className='h-8 w-48' />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue='details' className='w-full'>
            <TabsList className='grid w-full grid-cols-3'>
              <TabsTrigger value='details'>
                <Skeleton className='h-4 w-16' />
              </TabsTrigger>
              <TabsTrigger value='children'>
                <Skeleton className='h-4 w-16' />
              </TabsTrigger>
              <TabsTrigger value='additional'>
                <Skeleton className='h-4 w-20' />
              </TabsTrigger>
            </TabsList>

            <TabsContent value='details' className='mt-6'>
              <ParentDetailsTabLoader />
            </TabsContent>

            <TabsContent value='children' className='mt-6'>
              <ChildrenDetailsTabLoader />
            </TabsContent>

            <TabsContent value='additional' className='mt-6'>
              <RideGroupsTabLoader />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
