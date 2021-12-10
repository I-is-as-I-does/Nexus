const path = require('path');
const webpack = require('webpack');
const TerserPlugin = require('terser-webpack-plugin');
const license = 'Nexus | (c) 2021 I-is-as-I-does | AGPLv3 license';

module.exports = {
    mode: 'production',
    entry: {
        NxIO: './src/NxIO.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'js/[name].js',
    },
    optimization: {
        minimizer: [new TerserPlugin({
            extractComments: false,
          })],
        splitChunks: {
            chunks: 'all',
            cacheGroups: {
                SSITU: {
                    test: /[\\/]libr[\\/]/,
                    name: 'SSITU',
                    chunks: 'all',
                },
                NxCore: {
                    test: /[\\/]core[\\/]/,
                    name: 'NxCore',
                    chunks: 'all',
                },
                NxEditor: {
                    test: /[\\/]editor[\\/]/,
                    name: 'NxEditor',
                    chunks: 'all',
                },
                NxViewer: {
                    test: /[\\/]viewer[\\/]/,
                    name: 'NxViewer',
                    chunks: 'all',
                }
            }
        }
    },
    plugins: [
        new webpack.optimize.ModuleConcatenationPlugin(),
        new webpack.BannerPlugin({
            banner: license,
        })
    ],
}