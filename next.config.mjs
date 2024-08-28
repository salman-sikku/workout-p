/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "img.freepik.com"
            },
            {
                protocol: "https",
                hostname: "utfs.io"
            },
            {
                protocol: "https",
                hostname: "firebasestorage.googleapis.com"
            }
        ]
    }
};

export default nextConfig;
