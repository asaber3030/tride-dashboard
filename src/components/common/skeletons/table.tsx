import { Skeleton } from "@/components/ui/skeleton"

type TableSkeletonProps = {
  rows?: number
  columns?: number
}

export function TableSkeleton({ rows = 5, columns = 4 }: TableSkeletonProps) {
  return (
    <div>
      <div className='mb-2 flex items-center justify-between'>
        <Skeleton className='h-8 w-32 mb-4' />
        <Skeleton className='h-8 w-24 mb-2' />
      </div>
      <div className='overflow-x-auto border p-2 rounded-md'>
        <table className='w-full border-collapse'>
          <thead>
            <tr>
              {Array.from({ length: columns }).map((_, i) => (
                <th key={i} className='px-4 py-2'>
                  <Skeleton className='h-6 w-24' />
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: rows }).map((_, rowIdx) => (
              <tr key={rowIdx}>
                {Array.from({ length: columns }).map((_, colIdx) => (
                  <td key={colIdx} className='px-4 py-2'>
                    <Skeleton className='h-6 w-20' />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
