/** @type {import('next').NextConfig} */
// import cron from 'node-cron';
// const cron = require('node-cron');

// cron.schedule('* * * * *', function () {
//   console.log('Scheduled task runs every minute');
// });
const nextConfig = {
  webpack: (config, { isServer }) => {
    // Fixes npm packages that depend on `child_process` module
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        "child_process": false,
      };
    }

    return config;
  },
 
  rewrites: async () => {
    return [
      {
        source: "/api/:path*",
        destination:
          process.env.NODE_ENV === "development"
            ? "http://127.0.0.1:8000/api/:path*"
            : "/api/",
      },
      {
        source: "/docs",
        destination:
          process.env.NODE_ENV === "development"
            ? "http://127.0.0.1:8000/docs"
            : "/api/docs",
      },
      {
        source: "/openapi.json",
        destination:
          process.env.NODE_ENV === "development"
            ? "http://127.0.0.1:8000/openapi.json"
            : "/api/openapi.json",
      },
    ];
  },
};

module.exports = nextConfig;
