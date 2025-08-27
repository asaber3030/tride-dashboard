import routes from "./routes"
import { BarChart2, Car, UsersRound, FileText, MapPin, MessageSquare, CreditCard, School, LockIcon, BuildingIcon, ClipboardIcon, CarTaxiFront, TrainTrack, RotateCwIcon } from "lucide-react"

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

export const MapIcons = {
  driver: "/defaults/icons/driver.svg",
  school: "/defaults/icons/school.svg",
  checkpoint: "/defaults/icons/checkpoint.svg"
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
    name: "admins.admins",
    href: "/dashboard/admins",
    icon: LockIcon
  },
  {
    name: "rideGroups",
    href: "/dashboard/ride-groups",
    icon: Car
  },
  {
    name: "rideGroupsTracker",
    href: "/dashboard/ride-groups/tracker",
    icon: TrainTrack
  },
  {
    name: "liveTracking",
    href: "/dashboard/live-tracking",
    icon: RotateCwIcon
  },
  {
    name: "drivers",
    href: "/dashboard/drivers",
    icon: CarTaxiFront
  },
  {
    name: "parents",
    href: "/dashboard/parents",
    icon: UsersRound
  },

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
    name: "governorates",
    href: "/dashboard/governorates",
    icon: LockIcon
  },
  {
    name: "cities",
    href: "/dashboard/cities",
    icon: BuildingIcon
  },

  {
    name: "schools",
    href: "/dashboard/schools",
    icon: School
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

export const chatGroupsList = [
  {
    key: "customer_support",
    label: "customerServicesTab"
  },
  {
    key: "ride_group",
    label: "rideGroups"
  }
]

export const chatTypeList = [
  {
    key: "all",
    label: "allTab"
  },
  {
    key: "parent",
    label: "parentsTab"
  },
  {
    key: "driver",
    label: "driversTab"
  }
]

export const parentGroupStatusList = [
  {
    key: "new",
    label: "New"
  },
  {
    key: "active",
    label: "Active"
  },
  {
    key: "inactive",
    label: "Inactive"
  },
  {
    key: "expired",
    label: "Expired"
  },
  {
    key: "pending",
    label: "Pending"
  },
  {
    key: "ready",
    label: "Ready"
  },
  {
    key: "removed",
    label: "Removed"
  }
]

export const parentGroupSubscriptionStatusList = [
  {
    key: "new",
    label: "New"
  },
  {
    key: "pending",
    label: "Pending"
  },
  {
    key: "paid",
    label: "Paid"
  },
  {
    key: "expired",
    label: "Expired"
  }
]
