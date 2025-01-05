/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [],
    unoptimized: false,
  },
  transpilePackages: ['@headlessui/react', 'react-icons']
}

module.exports = nextConfig 