import type { NextConfig } from "next"
import createNextIntlPlugin from "next-intl/plugin"

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true
  },
  typescript: {
    ignoreBuildErrors: true
  },
  images: {
    remotePatterns: [{ hostname: "loremflickr.com" }, { hostname: "avatars.githubusercontent.com" }, { hostname: "147.93.123.109" }, { hostname: "cdn.jsdelivr.net" }]
  }
}

const withNextIntl = createNextIntlPlugin()

export default withNextIntl(nextConfig)
