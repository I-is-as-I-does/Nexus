const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const webpack = require('webpack');

const license = 'Nexus | (c) 2021 I-is-as-I-does | AGPLv3 license';

module.exports = {
    mode: 'production',
  entry: './src/io/NxReaderIO.js',
  output: {
    filename: 'js/NexusIO.js',
    path: path.resolve(__dirname, 'dist/'),
  },
  optimization: {
   splitChunks: {
     cacheGroups: {
       vendor: {
         test: /[\\/]lib[\\/]/,
         name: 'lib',
         chunks: 'all'
       }
     }
   }
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({filename:"css/main.css"}),
    new webpack.BannerPlugin({
      banner: license,
    })
],
}