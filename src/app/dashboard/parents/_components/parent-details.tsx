"use client"

import { useParent, useParentRideGroups } from "../_helpers/hooks"
import { useTranslations } from "next-intl"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChildrenDetailsTab } from "./children-tab"
import { ParentDetailsTab } from "./details-tab"
import { RideGroupsTab } from "./ride-groups-tab"
import ParentDetailsLoader from "./loaders/parent-details"

export function ParentDetails({ parentId }: { parentId: number }) {
  const t = useTranslations()

  const { data: parent, isLoading } = useParent(parentId)
  const { data: rideGroups, isLoading: isLoadingRideGroups } = useParentRideGroups(parentId)

  if (isLoading) return <ParentDetailsLoader />
  if (!parent) return "not found!"

  return (
    <div className='w-full mx-auto'>
      <Card>
        <CardHeader>
          <CardTitle className='text-2xl font-bold'>{t("parentDetails.title")}</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue='details' className='w-full'>
            <TabsList className='grid w-full grid-cols-3'>
              <TabsTrigger value='details'>{t("parentDetails.tabs.details")}</TabsTrigger>
              <TabsTrigger value='children'>{t("parentDetails.tabs.children")}</TabsTrigger>
              <TabsTrigger value='additional'>{t("parentDetails.tabs.additional")}</TabsTrigger>
            </TabsList>

            <TabsContent value='details' className='mt-6'>
              <ParentDetailsTab parent={parent} />
            </TabsContent>

            <TabsContent value='children' className='mt-6'>
              <ChildrenDetailsTab children={parent.children} />
            </TabsContent>

            <TabsContent value='additional' className='mt-6'>
              <RideGroupsTab rideGroups={rideGroups?.rows} isLoading={isLoadingRideGroups} count={rideGroups?.count} hasNextPage={rideGroups?.hasNextPage} hasPreviousPage={rideGroups?.hasPreviousPage} />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
