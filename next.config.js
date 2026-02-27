const nextConfig = {
  // theme: {
  //   extend: {
  //     fontFamily: {
  //       'cairo': ['var(--font-cairo)', 'sans-serif'],
  //       'opensans': ['var(--font-open-sans)', 'sans-serif'],
  //       'inter': ['var(--font-inter)', 'sans-serif'],
  //       'robotomono': ['var(--font-roboto-mono)', 'monospace'],
  //       'roboto': ['var(--font-roboto)', 'sans-serif'],
  //     },
  //   },
  // },
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
    };

    return config;
  },
  // transpilePackages: ['mobx', 'mobx-react-lite'],
  // async rewrites() {
  //   return [
  //     {
  //       source: '/api/dummy', // Better to name it what it actually returns
  //       destination: 'https://dummyjson.com/products', // Direct API call - NO PROXY NEEDED
  //     },
  //   ]
  // },
};

module.exports = nextConfig;