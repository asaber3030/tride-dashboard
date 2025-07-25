import { cn } from "@/lib/utils"
import { ClassValue } from "class-variance-authority/types"

type Props = {
  className?: ClassValue
  children?: React.ReactNode
  leftElements?: React.ReactNode
}
export const TableAction = ({ leftElements, children, className }: Props) => {
  return (
    <div className={cn("flex gap-2 items-center my-2", leftElements ? "justify-between" : "justify-end", className)}>
      {leftElements}
      {children}
    </div>
  )
}
