import { LOGO_PATH } from "@/lib/constants"
import { cn } from "@/lib/utils"

import Image from "next/image"
import Link from "next/link"

type Props = {
  href?: string
  className?: string
  width?: number
  height?: number
}

export default function AppLogo({ href = "/", className, width = 1000, height = 1000 }: Props) {
  return (
    <Link href={href}>
      <Image src={LOGO_PATH} alt='Logo' className={cn("w-32", className)} width={width} height={height} />
    </Link>
  )
}
