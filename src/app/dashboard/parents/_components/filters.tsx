import { usePaginatedSchools } from "../../schools/_helpers/hooks"
import { useState } from "react"
import { useRouter } from "next/navigation"

import { build } from "search-params"

import { ExportParentsButton } from "./export-button"
import { SearchableData } from "@/components/common/form/searchable-data"
import { SearchIcon } from "lucide-react"
import { Button } from "@/components/ui/button"

type Props = {
  sp: TObject
}

export const ParentsTableFilters = ({ sp }: Props) => {
  const router = useRouter()

  const [schoolId, setSchoolId] = useState<string>(sp.school_id || "")
  const [search, setSearch] = useState<string>(sp.search || "")

  const {
    data: schools,
    isLoading: isSchoolsLoading,
    isRefetching: isSchoolsRefetching
  } = usePaginatedSchools({
    name: search
  })

  const handleFilter = () => {
    router.push(`?${build({ ...sp, search: "", school_id: schoolId })}`)
  }

  return (
    <div className='flex items-end gap-2'>
      <div className='w-[450px]'>
        <SearchableData
          data={schools?.rows?.map((item) => ({
            label: item.school_name,
            id: item.id
          }))}
          search={search}
          setSearch={setSearch}
          loading={isSchoolsLoading || isSchoolsRefetching}
          setValue={setSchoolId}
          label='School'
        />
      </div>

      <Button icon={SearchIcon} onClick={handleFilter}>
        Filter
      </Button>

      {sp.school_id && (
        <Button variant='secondary' onClick={() => router.push("/dashboard/parents")}>
          Clear Filter
        </Button>
      )}
      <ExportParentsButton />
    </div>
  )
}
