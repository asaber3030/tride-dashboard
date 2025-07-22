import { cn } from "@/lib/utils"
import { ClassValue } from "class-variance-authority/types"

type Props = {
  className?: ClassValue
  children: React.ReactNode
}
export const TableAction = ({ children, className }: Props) => {
  return <div className={cn("flex gap-2 justify-end items-center my-2", className)}>{children}</div>
}
