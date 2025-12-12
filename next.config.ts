import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    // Chỉ áp dụng proxy ở dev mode (process.env.NODE_ENV === 'development')
    if (process.env.NODE_ENV !== 'development') {
      return [];
    }
    return [
      {
        source: "/api/:path*",
        destination: process.env.BACKEND_URL || "http://localhost:8080/api/:path*",
      },
    ];
  },
  // Tối ưu bảo mật: Tắt X-Powered-By header để tránh leak version Next.js (phòng CVE tương tự)
  poweredByHeader: false,
  // Tối ưu production: Cho phép images từ backend nếu cần (ví dụ: product images)
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: '**', // Hoặc chỉ định hostname backend để secure
      },
    ],
  },
};

export default nextConfig;