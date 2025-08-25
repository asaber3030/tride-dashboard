import qk from "@/lib/query-keys"
import { useQuery } from "@tanstack/react-query"
import { getAllPlans } from "./actions"

export function usePlans() {
  return useQuery({
    queryKey: qk.plans.index(),
    queryFn: getAllPlans
  })
}
