import { Fragment, useState } from "react"
import { useAllSchools } from "../../schools/_helpers/hooks"
import { useRouter } from "next/navigation"

import { build } from "search-params"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { InputSkeleton } from "@/components/common/skeletons/input"
import { Button } from "@/components/ui/button"

type Props = {
  sp: TObject
}

export const ParentsTableFilters = ({ sp }: Props) => {
  const router = useRouter()

  const [schoolId, setSchoolId] = useState<string>(sp.school_id || "")

  const { data: schools, isLoading: isSchoolsLoading, isError: isSchoolsHasError, error: schoolsError } = useAllSchools(sp)

  const handleFilter = () => {
    router.push(`?${build({ ...sp, search: "", school_id: schoolId })}`)
  }

  return (
    <Fragment>
      {isSchoolsLoading ? (
        <InputSkeleton />
      ) : (
        <Select onValueChange={(value) => setSchoolId(value)} value={schoolId}>
          <SelectTrigger className='min-w-[400px]'>
            <SelectValue placeholder='School' />
          </SelectTrigger>
          <SelectContent className='max-h-60'>
            {schools?.map((school) => (
              <SelectItem value={school.id.toString()}>{school.school_name}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}
      <Button onClick={handleFilter}>Filter</Button>
      {sp.school_id && (
        <Button variant='secondary' onClick={() => router.push("/dashboard/parents")}>
          Clear Filter
        </Button>
      )}
    </Fragment>
  )
}
