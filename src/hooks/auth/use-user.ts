import { AuthContext } from "@/providers"
import { useContext } from "react"

import { useQuery } from "@tanstack/react-query"
import { getUser } from "@/actions/auth"

export function useUser() {
  const query = useQuery({
    queryKey: ["currentUser"],
    queryFn: getUser
  })
  return {
    user: query.data,
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error
  }
}
