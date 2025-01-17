/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: "https",
            hostname: "quotationlocal.onrender.com",
            // pathname: "/uploads/**",
          },
        ],
      },
};

export default nextConfig;
