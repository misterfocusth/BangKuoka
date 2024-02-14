// Next-PWA
const withPWA = require("next-pwa");

// Next-Intl
const withNextIntl = require("next-intl/plugin")('./src/i18n.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'picsum.photos',
                port: '',
                pathname: '/**',
            },
        ],
    },
    ...withPWA({
        dest: 'public',
        register: true,
        skipWaiting: true
    })
}

module.exports = withNextIntl(nextConfig)
