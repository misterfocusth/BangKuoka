// Next-PWA
const withPWA = require("next-pwa");

// Next-Intl
const withNextIntl = require("next-intl/plugin")('./src/i18n.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
    ...withPWA({
        dest: 'public',
        register: true,
        skipWaiting: true
    })
}

module.exports = withNextIntl(nextConfig)
