import routes from "@/lib/routes"
import { redirect } from "next/navigation"

export default function page() {
  return redirect(routes.login)
}
