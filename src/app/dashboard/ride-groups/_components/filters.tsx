import { SearchBar } from "@/components/dashboard/search-bar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useTranslations } from "next-intl"
import { useRouter, useSearchParams } from "next/navigation"
import { FormEvent, useState } from "react"
import { build } from "search-params"

type Props = {}

export const RideGroupFilters = ({}: Props) => {
  const router = useRouter()
  const sp = useSearchParams()
  const t = useTranslations()

  const [search, setSearch] = useState<string>(sp.get("name") || "")
  const [seats, setSeats] = useState<string>(sp.get("seats") || "")
  const [groupType, setGroupType] = useState<string>(sp.get("type") || "")

  const submitFilters = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const query = build({
      name: search.trim(),
      seats: seats.trim(),
      type: groupType.trim()
    })

    router.push(`?${query}`)
  }

  return (
    <form className='grid grid-cols-7 gap-2' onSubmit={submitFilters}>
      <Input className='col-span-2' placeholder={t("Search by name, seats")} onChange={(e) => setSearch(e.target.value)} value={search} />
      <Select onValueChange={(value) => setSeats(value)} value={seats}>
        <SelectTrigger className='w-full col-span-2'>
          <SelectValue placeholder={t("seats")} />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value=' '>------</SelectItem>
          <SelectItem value='1'>1</SelectItem>
          <SelectItem value='2'>2</SelectItem>
          <SelectItem value='3'>3</SelectItem>
          <SelectItem value='4'>4</SelectItem>
          <SelectItem value='5'>5</SelectItem>
        </SelectContent>
      </Select>
      <Select onValueChange={(value) => setGroupType(value)} value={groupType}>
        <SelectTrigger className='w-full col-span-2'>
          <SelectValue placeholder={t("type")} />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value=' '>------</SelectItem>
          <SelectItem value='regular'>{t("regular")}</SelectItem>
          <SelectItem value='premium'>{t("premium")}</SelectItem>
        </SelectContent>
      </Select>
      <Button className='col-span-1'>{t("filter")}</Button>
    </form>
  )
}
