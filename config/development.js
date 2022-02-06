module.exports = function(dirs, splitChunks) {
  return {
    mode: "development",
    devtool: "source-map",
    entry: {
      NxIO: dirs.APP_DIR + "/NxIO.js",
    },
    output: {
      path: dirs.DEV_BUILD_DIR,
      filename: "js/[name].js",
    },
    optimization: {
      minimize: false,
      splitChunks: splitChunks
    },
  }
}