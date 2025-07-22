import qk from "@/lib/query-keys"

import { useQuery } from "@tanstack/react-query"
import { getPayment, getPaymentsPaginated } from "./actions"

export function usePaginatedPayments(searchParams: TObject = {}) {
  return useQuery({
    queryKey: qk.payments.paginated(searchParams),
    queryFn: ({ queryKey }) => getPaymentsPaginated(queryKey[2] as TObject)
  })
}

export function usePayment(id: number) {
  return useQuery({
    queryKey: qk.payments.single(id),
    queryFn: ({ queryKey }) => getPayment(queryKey[1] as number)
  })
}
