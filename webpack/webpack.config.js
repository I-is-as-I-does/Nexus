const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const webpack = require('webpack');

const license = 'Nexus | (c) 2021 I-is-as-I-does | AGPLv3 license';

module.exports = {
    mode: 'production',
    entry: {
   //   NxTransl:'./src/transl/NxCommons.js',
      NxViewerIO:'./src/io/NxViewerIO.js',
      NxEditorIO: {
        import: './src/io/NxEditorIO.js',
        dependOn: 'NxViewerIO',
      }
    }
  /*  NxJack:'./src/NxJackBundle.js',
    NxValva:'./src/NxValvaBundle.js',
    NxUtils:'./src/NxUtilsBundle.js',
    NxCore:'./src/NxCoreBundle.js',
    NxShared:'./src/NxSharedBundle.js',
    NxGo:'./src/NxGoBundle.js',}*/
  ,
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'js/[name].js',
    },
    optimization: {
  /*   splitChunks: {

        chunks: 'all',
        name: 'Nx',
     cacheGroups: {
      vendor: {
        test: /[\\/]lib[\\/]/,
        name(module) {
          const packageName = module.context.match(/[\\/]lib[\\/](.*?)([\\/]|$)/)[1];
          return `ssitu.${packageName}`;
        },
      },
    },
  },*/
    },
  module: {
  //  rules: [
  //    {
   //     test: /\.css$/i,
   //     use: [MiniCssExtractPlugin.loader, "css-loader"],
   //   },
   // ]
  },
  plugins: [
   //new webpack.optimize.ModuleConcatenationPlugin(),
   // new MiniCssExtractPlugin({filename:"css/main.css"}),
    new webpack.BannerPlugin({
      banner: license,
    })
],
}