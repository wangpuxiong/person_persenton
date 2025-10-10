const localhost = 'https://slides.comparegpt.io'

console.log('trigger', localhost)

const nextConfig = {
  allowedDevOrigins: ['local-origin.dev', '*.local-origin.dev'],
  reactStrictMode: false,
  distDir: ".next-build",


  // Rewrites for development - proxy API and font requests to FastAPI backend
  async rewrites () {
    return [
      {
        source: '/api/v1/auth',
        destination: `${localhost}/api/v1/auth`,
      },
      {
        source: '/api/v1/ppt/:path*',
        destination: `${localhost}/api/v1/ppt/:path*`,
      },
      {
        source: '/api/v1/auth/:path*',
        destination: `${localhost}/api/v1/auth/:path*`,
      },
      {
        source: '/app_data/fonts/:path*',
        destination: `${localhost}/app_data/fonts/:path*`,
      },
      {
        source: '/static/:path*',
        destination: `${localhost}/static/:path*`,
      },
      {
        source: '/app_data/:path*',
        destination: `${localhost}/app_data/:path*`,
      }
    ]
  },

  async headers () {
    return [
      {
        source: '/api/v1/:path*',
        headers: [
          {
            key: 'Cookie',
            value: ':path*', // 保留原始请求的 Cookie
          },
          // 允许跨域请求携带凭证（关键！）
          {
            key: 'Access-Control-Allow-Credentials',
            value: 'true',
          },
        ],
      },
    ]
  },

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "pub-7c765f3726084c52bcd5d180d51f1255.r2.dev",
      },
      {
        protocol: "https",
        hostname: "pptgen-public.ap-south-1.amazonaws.com",
      },
      {
        protocol: "https",
        hostname: "pptgen-public.s3.ap-south-1.amazonaws.com",
      },
      {
        protocol: "https",
        hostname: "img.icons8.com",
      },
      {
        protocol: "https",
        hostname: "present-for-me.s3.amazonaws.com",
      },
      {
        protocol: "https",
        hostname: "yefhrkuqbjcblofdcpnr.supabase.co",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "picsum.photos",
      },
      {
        protocol: "https",
        hostname: "unsplash.com",
      },
    ],
  },
}

export default nextConfig
