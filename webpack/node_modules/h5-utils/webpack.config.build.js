var webpack = require('webpack');
var merge = require('webpack-merge');
var base = require('./webpack.config.base.js');

module.exports = merge(base, {
  entry: './src/main.js',
  output: {
    path: './',
    filename: 'h5-utils.js',
    library: 'Utils',
    libraryTarget: 'umd',
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
      },
      output: {
        comments: false,
      },
    }),
  ],
});
