const path = require('path');

module.exports = {
    trailingSlash: true,
    reactStrictMode: false,
    experimental: {
        esmExternals: false,
        jsconfigPaths: true // enables it for both jsconfig.json and tsconfig.json
    },
    webpack: config => {
        config.resolve.fallback = { net: false, tls: false };
        config.resolve.alias = {
            ...config.resolve.alias,
            apexcharts: path.resolve(__dirname, './node_modules/apexcharts-clevision')
        };

        return config;
    }
};