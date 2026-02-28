const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/dummy-image/:path*',
        destination: 'https://cdn.dummyjson.com/:path*',
      },
    ];
  },
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
    };

    return config;
  },
};

module.exports = nextConfig;