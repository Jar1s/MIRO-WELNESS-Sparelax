import type { NextConfig } from "next";

const supabaseUrl = process.env.SUPABASE_URL;
let supabaseHost: string | undefined;

try {
  supabaseHost = supabaseUrl ? new URL(supabaseUrl).hostname : undefined;
} catch {
  supabaseHost = undefined;
}

const nextConfig: NextConfig = {
  reactStrictMode: true,
  compress: true,
  async headers() {
    return [
      {
        source: "/images/optimized/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/videos/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
  images: {
    formats: ["image/avif", "image/webp"],
    ...(supabaseHost
      ? {
          remotePatterns: [
            {
              protocol: "https",
              hostname: supabaseHost,
              pathname: "/storage/v1/object/public/**",
            },
          ],
        }
      : {}),
  },
};

export default nextConfig;
