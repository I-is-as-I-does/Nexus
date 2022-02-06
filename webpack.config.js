const path = require('path');
const webpack = require('webpack');
const TerserPlugin = require('terser-webpack-plugin');
const license = 'Nexus | (c) 2021 I-is-as-I-does | AGPLv3 license';

module.exports = {
    mode: 'development',
    devtool: 'source-map',
    entry: {
        NxIO: './src/NxIO.js'
    },
    output: {
        path: path.resolve(__dirname, 'public'),
        filename: 'js/[name].js',
    },
    optimization: {
        minimize: false,
        splitChunks: {
            chunks: 'all',
            cacheGroups: {
                SSITU: {
                    test: /[\\/](valva|jack-js)[\\/]/,
                    name: 'SSITU',
                    chunks: 'all',
                },
                NxCore: {
                    test: /[\\/]nexus-core[\\/]/,
                    name: 'NxCore',
                    chunks: 'all',
                },
                NxEditor: {
                    test: /[\\/]editor[\\/]/,
                    name: 'NxEditor',
                    chunks: 'all',
                },
                NxViewer: {
                    test: /([\\/]viewer[\\/]|NxStart.js|NxState.js)/,
                    name: 'NxViewer',
                    chunks: 'all',
                }
            }
        }
    },
    plugins: [
       // new webpack.optimize.ModuleConcatenationPlugin(),
        new webpack.BannerPlugin({
            banner: license,
        })
    ],
}