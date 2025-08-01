import { useRideGroupTrackerStore } from "@/store/ride-group-store"
import { useTranslations } from "next-intl"
import { useRouter } from "next/navigation"

import { cn } from "@/lib/utils"

import { CarIcon, ChartPieIcon } from "lucide-react"
import { build } from "search-params"

export const RideGroupTrackerGroupTypeFilter = ({ searchParams }: { searchParams: TObject }) => {
  const router = useRouter()
  const t = useTranslations()

  const { groupType, setGroupType } = useRideGroupTrackerStore()

  const handleRideGroupTypeChange = (type: TGroupType) => {
    setGroupType(type)
    const query = build({
      ...searchParams,
      type
    })
    router.push(`?${query}`)
  }

  return (
    <div className='flex gap-8 items-center justify-center bg-white mx-auto rounded-lg p-4 mb-4 border'>
      <div onClick={() => handleRideGroupTypeChange("premium")} className={cn("flex gap-2 items-center cursor-pointer", groupType === "premium" && "text-blue-500 font-bold")}>
        <CarIcon className='size-5' /> {t("fullCar")}
      </div>
      <div onClick={() => handleRideGroupTypeChange("regular")} className={cn("flex gap-2 items-center cursor-pointer", groupType === "regular" && "text-blue-500 font-bold")}>
        <ChartPieIcon className='size-5' /> {t("seat")}
      </div>
    </div>
  )
}
