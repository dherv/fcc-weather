const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const TerserPlugin = require('terser-webpack-plugin');
const { WebpackManifestPlugin } = require('webpack-manifest-plugin');

module.exports = merge(common, {
  mode: 'production',
  plugins: [
    new WebpackManifestPlugin()
  ],
  optimization: {
    minimizer: [new TerserPlugin()],
  },
});