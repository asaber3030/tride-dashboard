"use client"

import { usePaginatedSchools } from "../_helpers/hooks"

import { SimplePagination } from "@/components/common/simple-pagination"
import { SchoolsColumns } from "./columns"
import { TableSkeleton } from "@/components/common/skeletons/table"
import { DisplayError } from "@/components/common/error"
import { ExportButton } from "@/components/common/export-button"
import { TableAction } from "@/components/common/table-action"
import { DataTable } from "@/components/common/data-table"
import { LinkBtn } from "@/components/common/link-button"
import { Plus } from "lucide-react"

import routes from "@/lib/routes"

type Props = {
  sp: TObject
}

export const SchoolsTable = ({ sp = {} }: Props) => {
  const { data: schools, isLoading, isError, error } = usePaginatedSchools(sp)

  if (isLoading) return <TableSkeleton />
  if (isError) return <DisplayError error={error} />

  return (
    <div className='space-y-4'>
      <TableAction>
        <LinkBtn href={routes.createSchool} icon={Plus}>
          Create
        </LinkBtn>
        <ExportButton url='/school/export' fileName='schools' />
      </TableAction>
      <DataTable data={schools?.rows!} columns={SchoolsColumns} />
      <SimplePagination hasNextPage={schools?.hasNextPage!} hasPrevPage={schools?.hasPrevPage!} />
    </div>
  )
}
