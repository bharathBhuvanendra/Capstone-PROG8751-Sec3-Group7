const { createHash } = require('crypto');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

module.exports = {
  webpack: {
    configure: (webpackConfig, { env }) => {
      // Generate a unique hash prefix for each build
      const generateHashPrefix = () => createHash('md5').update(Date.now().toString()).digest('hex').slice(0, 8);

      // Customize chunk splitting with cacheGroups
      webpackConfig.optimization.splitChunks = {
        chunks: 'all',
        minSize: 30000, // Allow chunks to be larger before splitting
        maxSize: 100000, // Prevent excessive splitting
        maxAsyncRequests: 10,
        maxInitialRequests: 10,
        automaticNameDelimiter: '-',
        cacheGroups: {
          defaultVendors: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            priority: -10,
          },
          components: {
            test: /[\\/]src[\\/]components[\\/]/,
            priority: -5,
            reuseExistingChunk: true,
            name(module) {
              const componentNameMatch = module.context.match(/components[\\/](\w+)/);
              return componentNameMatch ? `${componentNameMatch[1]}` : 'component';
            },
          },
        },
      };
      

      // Customize output file naming for better identification
      webpackConfig.output = {
        ...webpackConfig.output,
        filename: 'static/js/[name].[contenthash:8].js',
        chunkFilename: 'static/js/[name].[contenthash:8].chunk.js', // No custom prefix
      };
      

      // Add BundleAnalyzerPlugin only for production builds
      if (env === 'production' || env === 'local') {
        webpackConfig.plugins.push(new BundleAnalyzerPlugin());
      }

      return webpackConfig;
    },
  },
};
