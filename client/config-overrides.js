const { createHash } = require('crypto');

module.exports = function override(config, env) {
  // Generate a unique hash prefix for each build
  const generateHashPrefix = () => createHash('md5').update(Date.now().toString()).digest('hex').slice(0, 8);

  // Customize chunk splitting
  config.optimization = {
    ...config.optimization,
    splitChunks: {
      ...config.optimization.splitChunks,
      chunks: 'all', // Split chunks for all module types
      minSize: 20000, // Minimum size for a chunk
      maxSize: 40000, // Maximum size for a chunk
      minChunks: 1,   // Minimum number of chunks that must share a module
      automaticNameDelimiter: '-', // Delimiter for auto-generated chunk names
      name: (module, chunks, cacheGroupKey) => {
        const allChunksNames = chunks.map((item) => item.name || cacheGroupKey).join('-');
        return `${generateHashPrefix()}-${allChunksNames}`;
      },
    },
  };

  // Change output file naming for better identification
  config.output = {
    ...config.output,
    filename: 'static/js/[name].[hash].js', // Main files
    chunkFilename: `static/js/[name]-${generateHashPrefix()}.[chunkhash].chunk.js`, // For dynamic chunks
  };

  return config;
};
