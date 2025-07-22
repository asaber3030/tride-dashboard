"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { useTranslations } from "next-intl"

import { cn } from "@/lib/utils"

import { ClassValue } from "class-variance-authority/types"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"

import { FormEvent, useState } from "react"

type Props = {
  parentClassName?: ClassValue
  inputClassName?: ClassValue
  iconClassName?: ClassValue
}

export function SearchBar({ parentClassName, inputClassName, iconClassName }: Props) {
  const router = useRouter()
  const sp = useSearchParams()
  const t = useTranslations()

  const [search, setSearch] = useState(sp.get("search") || "")

  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    router.push(`?search=${search}`)
  }

  return (
    <form onSubmit={handleSearch} className={cn("relative xl:w-1/2 w-full", parentClassName)}>
      <Search className={cn("absolute left-2.5 top-2.5 h-4 w-4 text-gray-500", iconClassName)} />
      <Input onChange={(e) => setSearch(e.target.value)} value={search} type='search' placeholder={t("search") + "...."} className={cn("w-full pl-9 pr-4 py-2 rounded-md border", inputClassName)} />
    </form>
  )
}
