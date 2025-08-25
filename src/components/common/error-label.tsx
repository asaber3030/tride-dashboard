import { cn } from "@/lib/utils"
import { ClassValue } from "class-variance-authority/types"

type Props = {
  children: React.ReactNode
  className?: ClassValue
}

export const ErrorLabel = ({ className, children }: Props) => {
  return <p className={cn("text-red-500 text-sm font-medium mt-1", className)}>{children}</p>
}
