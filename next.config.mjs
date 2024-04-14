/** @type {import('next').NextConfig} */
const nextConfig = {
   images: {
      // formats: ["image/avif", "image/webp"],
      remotePatterns: [
         {
            protocol: "https",
            hostname: "files.edgestore.dev",
            port: "",
            // pathname: "/image/upload/**",
         },
      ],
   },
};

export default nextConfig;
