import { cn } from "@/lib/utils"
import { Spinner } from "../kibo/spinner"
import { ClassValue } from "class-variance-authority/types"

type Props = {
  variant?: any
  className?: ClassValue
}

export const DefaultLoading = ({ variant = "pinwheel", className }: Props) => {
  return (
    <div className={cn("flex flex-col items-center justify-center", className)}>
      <Spinner variant={variant} />
    </div>
  )
}
