import { useMutation } from "@tanstack/react-query"

import { handleError, showResponse } from "@/lib/utils"
import { loginAction } from "@/actions/auth"

import { LoginData } from "@/types/models"
import { useRouter } from "next/navigation"
import routes from "@/lib/routes"

type TMut = {
  data: LoginData
  accountType?: TAccountType
  deviceToken?: string
  rememberMe?: boolean
  redirectUrl?: string
}

export function useLogin() {
  const router = useRouter()

  return useMutation({
    mutationFn: ({ data, accountType, redirectUrl, rememberMe, deviceToken }: TMut) => loginAction({ data, rememberMe, accountType, deviceToken, redirectUrl }),
    onSuccess: (data) =>
      showResponse(data, () => {
        router.push(routes.dashboard)
      }),
    onError: (error) => handleError(error)
  })
}
