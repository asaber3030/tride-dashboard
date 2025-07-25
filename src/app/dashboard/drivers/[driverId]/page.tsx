import { DriverDocuments } from "../_components/driver-details"

type Props = {
  params: Promise<{ driverId: string }>
}

export default async function DriverDocumentsPage({ params }: Props) {
  const { driverId } = await params
  const id = +driverId

  return (
    <div className='p-6'>
      <DriverDocuments driverId={id} />
    </div>
  )
}
