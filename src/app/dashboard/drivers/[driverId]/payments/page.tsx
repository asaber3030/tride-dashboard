import { DriverPaymentTable } from "../../_components/payments/table"
import { PageHeader } from "@/components/dashboard/page-header"

type Props = {
  params: Promise<{ driverId: string }>
  searchParams: TSearchParams
}

export default async function DriverPaymentsPage({ searchParams, params }: Props) {
  const { driverId } = await params

  const sp = await searchParams
  const id = +driverId

  return (
    <div className='p-6'>
      <PageHeader title='Driver Payments' description='Manage driver payments' />
      <DriverPaymentTable driverId={id} sp={sp} />
    </div>
  )
}
