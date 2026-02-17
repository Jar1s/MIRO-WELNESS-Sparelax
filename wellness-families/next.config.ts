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
