export const LANGUAGE_COOKIE = "language"
export const AUTH_COOKIE = "tride-token"
export const LOGO_PATH = "/logo/main.svg"
export const DEFAULT_USER_IMAGE = "/defaults/user.jpeg"
export const DEFAULT_PLACEHOLDER = "/defaults/placeholder.jpg"
export const API_URL = process.env.NEXT_PUBLIC_API_URL
export const SOCKET_URL = process.env.NEXT_PUBLIC_WS_URL
export const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!
export const TOKEN_EXPIRATION_DATE = Date.now() + 24 * 60 * 60 * 1000 * 30
export const IMAGES = {
  user: "/defaults/images/user.png",
  placeholder: "/defaults/images/placeholder.jpg",
  auth: "/defaults/auth/login.png"
}

export const DEFAULT_COORDINATES = {
  lat: 29.9792,
  lng: 31.1342
}
