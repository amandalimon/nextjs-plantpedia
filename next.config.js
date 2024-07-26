const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

const config = {
  future: {
    webpack5: true,
  },
  env: {
    NEXT_PUBLIC_SPACE_ID: process.env.NEXT_PUBLIC_SPACE_ID,
    NEXT_PUBLIC_ACCESS_TOKEN: process.env.NEXT_PUBLIC_ACCESS_TOKEN,
  },
  images: {
    domains: ['images.ctfassets.net'],
  },
};

module.exports = withBundleAnalyzer(config);
