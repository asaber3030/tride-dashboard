import routes from "./routes"
import { BarChart2, Car, FileText, MapPin, MessageSquare, CreditCard, School, LockIcon, BuildingIcon } from "lucide-react"

export const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

export const Languages = [
  { code: "en", name: "english", image: "/defaults/languages/english.svg" },
  { code: "ar", name: "arabic", image: "/defaults/languages/arabic.svg" }
]
export const LanguagesList = ["en", "ar"]

export const ParentPaymentsStatus = {
  new: "outlineGray",
  pending: "outlineYellow",
  paid: "outlineGreen",
  expired: "outlineRed"
}

export const SettingsTabs = [
  { name: "accountSettings", href: routes.settings("account") },
  { name: "adminRoles", href: routes.settings("roles") }
]

export const SidebarLinks = [
  {
    name: "dashboard",
    href: "/dashboard",
    icon: BarChart2
  },
  {
    name: "trips",
    href: "/dashboard/ride-groups",
    icon: Car
  },
  {
    name: "requests",
    href: "/dashboard/drivers",
    icon: FileText
  },
  /*   {
    name: "liveTracking",
    href: "/dashboard/live-tracking",
    icon: MapPin
  }, */
  {
    name: "chats",
    href: "/dashboard/chats/customer_support",
    icon: MessageSquare
  },
  {
    name: "payments",
    href: "/dashboard/payments",
    icon: CreditCard
  },
  {
    name: "admins.admins",
    href: "/dashboard/admins",
    icon: LockIcon
  },
  {
    name: "schools",
    href: "/dashboard/schools",
    icon: School
  },
  {
    name: "cities",
    href: "/dashboard/cities",
    icon: BuildingIcon
  },
  {
    name: "governorates",
    href: "/dashboard/governorates",
    icon: LockIcon
  }
]

export const messageTypes = {
  TEXT: "text",
  IMAGE: "image",
  VIDEO: "video",
  AUDIO: "audio",
  DOCUMENT: "document",
  LOCATION: "location"
}
