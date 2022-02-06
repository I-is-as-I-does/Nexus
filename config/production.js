const webpack = require("webpack")
const TerserPlugin = require("terser-webpack-plugin")
const license = "Nexus | (c) 2021-22 I-is-as-I-does | AGPLv3 license"

module.exports = function(dirs, splitChunks) {
  return {
    mode: "production",
    entry: {
      NxIO: dirs.APP_DIR + "/NxIO.js",
    },
    output: {
      path: dirs.BUILD_DIR,
      filename: "js/[name].js",
    },
    optimization: {
      minimizer: [
        new TerserPlugin({
          extractComments: false,
        }),
      ],
      splitChunks: splitChunks
    },
    plugins: [
      new webpack.optimize.ModuleConcatenationPlugin(),
      new webpack.BannerPlugin({
        banner: license,
      }),
    ],
  }
}
