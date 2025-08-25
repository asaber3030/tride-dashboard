"use client"

import { GOOGLE_MAPS_API_KEY } from "@/lib/constants"
import { LoadScript } from "@react-google-maps/api"

type Props = { children: React.ReactNode }

export const MapWrapper = ({ children }: Props) => {
  return <LoadScript googleMapsApiKey={GOOGLE_MAPS_API_KEY}>{children}</LoadScript>
}
