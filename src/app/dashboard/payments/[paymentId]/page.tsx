import { PageHeader } from "@/components/dashboard/page-header"
import { PaymentDetails } from "../_components/view-details"

type Props = {
  params: Promise<{
    paymentId: string
  }>
}

export default async function ViewPaymentDetails({ params }: Props) {
  const { paymentId } = await params
  const id = +paymentId

  return (
    <div className='p-6'>
      <PageHeader title={"View Details"} description={"View All payment details and its history"} />
      <div className='overflow-x-auto'>
        <PaymentDetails id={id} />
      </div>
    </div>
  )
}
