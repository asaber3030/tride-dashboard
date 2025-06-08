import { DriverDocuments } from "../_components/driver-details"

export default function DriverDocumentsPage({ params }: { params: { id: string } }) {
  return (
    <div className='p-6'>
      <DriverDocuments driverId={params.id} />
    </div>
  )
}
